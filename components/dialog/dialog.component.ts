import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { NgxDialogDirective } from './dialog.directive';
import { Overlay, OverlayConfig, OverlayKeyboardDispatcher, OverlayRef, ViewportRuler } from '@angular/cdk/overlay';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import { DragDropRegistry, DragRef, DragRefConfig, DropListRef, Point } from '@angular/cdk/drag-drop';
import { delay, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ngx-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NzDestroyService],
})
export class NgxDialogComponent implements OnInit, OnChanges, OnDestroy {
    /**
     * 是否显示(支持双向绑定)
     */
    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    /**
     * 弹框标题
     */
    @Input() title: string | TemplateRef<any> = '';
    /**
     * 弹框内容模板
     */
    @ContentChild(NgxDialogDirective, { static: true, read: TemplateRef }) contentTemplate?: TemplateRef<any>;
    /**
     * 是否全屏
     */
    @Input() full = false;
    /**
     * 是否展示遮罩
     */
    @Input() mask = true;
    /**
     * 是否启用拖动边界【可视区域内拖动】
     */
    @Input() dragBoundary = true;
    /**
     * 是否支持键盘 esc 关闭
     */
    @Input() keyboard = true;
    /**
     * 是否启用拖拽
     */
    @Input() move = true;
    /**
     * 是否允许拖拽弹层右下角拉伸尺寸
     */
    @Input() resize = true;
    /**
     * 宽度
     */
    @Input() width: number | string = 960;
    /**
     * 高度
     */
    @Input() height: number | string = 580;
    /**
     * 最小宽度
     */
    @Input() minWidth: number = 400;
    /**
     * 最小高度
     */
    @Input() minHeight: number = 200;
    /**
     * 窗口距离顶部距离
     */
    @Input() top?: string;
    /**
     * 窗口距离左边距离
     */
    @Input() left?: string;
    /**
     * 窗口距离右边距离
     */
    @Input() right?: string;
    /**
     * 窗口距离底部距离
     */
    @Input() bottom?: string;

    constructor(
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private destroy: NzDestroyService,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document,
        private ngZone: NgZone,
        private platform: Platform,
        private overlayKeyboardDispatcher: OverlayKeyboardDispatcher
    ) {}

    /**
     * 弹框模板
     */
    @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<HTMLElement>;
    @ViewChild('dialogTitle') set dialogTitle(value: ElementRef<HTMLElement>) {
        if (this.dragRef && this.visible) {
            // todo: 设置拖动手柄
            this.dragRef.withHandles([value.nativeElement]);
            this.dragRef.disabled = false;
        }
    }
    /**
     * 浮层对象
     */
    private overlayRef?: OverlayRef | null;
    /**
     * 渲染模板
     */
    private templatePortal?: TemplatePortal;
    /**
     * 拖动对象
     */
    private dragRef?: DragRef;
    /**
     * 最后一次拖动后的位置
     */
    private dragLastPosition: Point = { x: 0, y: 0 };
    /**
     * 全屏状态
     */
    fullscreen = false;

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        const { visible } = changes;
        if (visible) {
            const value = changes.visible.currentValue;
            if (value) {
                this.open();
            } else {
                this.close();
            }
        }
    }

    ngOnDestroy(): void {
        this.disposeOverlay();
    }

    open() {
        this.attachOverlay();
        this.visible = true;
        this.visibleChange.emit(true);
        this.overlayKeyboardDispatcher.add(this.overlayRef!);
        this.updateFullScreen(this.full);
        this.updateOverlayStyle();
        this.updateBodyOverflow();
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(false);
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.overlayKeyboardDispatcher.remove(this.overlayRef!);
        this.disposeOverlay();
        this.dragLastPosition = { x: 0, y: 0 };
    }

    updateFullScreen(full = false): void {
        if (this.overlayRef) {
            this.fullscreen = full;
            this.overlayRef.updateSize({
                height: full ? '100vh' : this.height,
                width: full ? '100vw' : this.width,
            });
            // 更新下位置策略：解决初始全屏点还原按钮后缩小后的窗口不在屏幕中间的问题 setFreeDragPosition({ x: 0, y: 0 }) 没有生效
            this.overlayRef.updatePosition();
            if (this.dragRef) {
                if (full) {
                    this.dragRef.setFreeDragPosition({ x: 0, y: 0 });
                } else {
                    this.dragRef.setFreeDragPosition(this.dragLastPosition);
                }
            }
        }
    }

    private attachOverlay(): void {
        this.templatePortal = new TemplatePortal(this.dialogTemplate, this.viewContainerRef);
        this.overlayRef = this.overlay.create(this.getOverlayConfig());

        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef
                .attachments()
                .pipe(takeUntil(this.destroy))
                .subscribe(() => {
                    this.setOverlayCenterPosition();
                    this.dragOverlay();
                    this.resizeOverlay();
                });
            this.overlayRef.attach(this.templatePortal);
            this.overlayRef
                .keydownEvents()
                .pipe(takeUntil(this.destroy))
                .subscribe((event: KeyboardEvent) => {
                    if (this.overlayRef && event.key === 'Escape' && this.keyboard) {
                        this.close();
                    }
                });
        }
    }

    private getOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay.position().global();
        const scrollStrategy = this.overlay.scrollStrategies.block();
        return new OverlayConfig({
            positionStrategy,
            scrollStrategy,
            hasBackdrop: this.mask,
            disposeOnNavigation: true,
            width: this.width,
            height: this.height,
            minWidth: this.minWidth,
            minHeight: this.minHeight,
            panelClass: 'dialog-panel',
        });
    }

    private disposeOverlay(): void {
        this.overlayRef?.dispose();
        this.overlayRef = null;
    }

    private updateOverlayStyle(): void {
        if (this.overlayRef && this.overlayRef.overlayElement) {
            this.renderer.setStyle(this.overlayRef.overlayElement, 'pointer-events', this.visible ? 'auto' : 'none');
        }
    }

    private updateBodyOverflow(): void {
        if (this.overlayRef) {
            if (this.visible) {
                this.overlayRef.getConfig().scrollStrategy!.enable();
            } else {
                this.overlayRef.getConfig().scrollStrategy!.disable();
            }
        }
    }

    private setOverlayCenterPosition(): void {
        if (this.overlayRef) {
            const { overlayElement } = this.overlayRef;
            const overlayRect = overlayElement.getBoundingClientRect();
            const bodyRect = this.document.body.getBoundingClientRect();
            const positionStrategy = this.overlay.position().global();
            if (this.top) {
                positionStrategy.top(this.top);
            }
            if (this.left) {
                positionStrategy.left(this.left);
            }
            if (this.right) {
                positionStrategy.right(this.right);
            }
            if (this.bottom) {
                positionStrategy.bottom(this.bottom);
            }
            if ([!this.top, !this.left, !this.right, !this.bottom].every(Boolean)) {
                positionStrategy
                    .top(`${this.calculateCenterPosition(overlayRect.height, bodyRect.height)}px`)
                    .left(`${this.calculateCenterPosition(overlayRect.width, bodyRect.width)}px`);
            }
            this.overlayRef.updatePositionStrategy(positionStrategy);
        }
    }

    private calculateCenterPosition(elementSize: number, bodySize: number): number {
        return bodySize / 2 - elementSize / 2;
    }

    private dragOverlay(): void {
        if (!this.move) {
            return;
        }
        const { overlayElement, hostElement } = this.overlayRef!;
        if (overlayElement) {
            const dragRefConfig: DragRefConfig = { dragStartThreshold: 1, pointerDirectionChangeThreshold: 2 };
            const viewportRuler = new ViewportRuler(this.platform, this.ngZone, this.document);
            const dragDropRegistry = new DragDropRegistry<DragRef, DropListRef>(this.ngZone, this.document);
            this.dragRef = new DragRef(
                overlayElement,
                dragRefConfig,
                this.document,
                this.ngZone,
                viewportRuler,
                dragDropRegistry
            );
            this.dragRef.disabled = true;
            this.dragRef.released.pipe(delay(1)).subscribe(({ source }) => {
                this.dragLastPosition = source.getFreeDragPosition();
            });

            if (this.dragBoundary) {
                this.dragRef.withBoundaryElement(hostElement);
            }
        }
    }

    private resizeOverlay(): void {
        if (!this.resize) {
            return;
        }
        const { overlayElement } = this.overlayRef!;
        this.renderer.setStyle(overlayElement, 'overflow', 'hidden');
        this.renderer.setStyle(overlayElement, 'resize', 'both');
    }
}
