import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
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
import { takeUntil } from 'rxjs/operators';
import { NzDestroyService } from 'ng-zorro-antd/core/services';

@Component({
    selector: 'ngx-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NzDestroyService],
})
export class NgxLoadingComponent implements OnInit, OnChanges, OnDestroy {
    /**
     * 是否显示(支持双向绑定)
     */
    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    /**
     * 提示内容
     */
    @Input() tip = '加载中…';
    /**
     * 是否行内模式
     */
    @Input() inline = false;

    constructor(
        private elementRef: ElementRef,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private destroy: NzDestroyService,
        private renderer: Renderer2
    ) {}

    @ViewChild('loadingTemplate', { static: true }) loadingTemplate!: TemplateRef<ElementRef>;
    /**
     * 浮层对象
     */
    private overlayRef?: OverlayRef | null;
    /**
     * 渲染模板
     */
    private templatePortal?: TemplatePortal;
    /**
     * 父元素大小改变监听对象
     */
    private resizeObserver?: ResizeObserver;

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
        this.updateOverlayStyle();
        this.updateBodyOverflow();
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(false);
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.disposeOverlay();
    }

    private attachOverlay(): void {
        this.templatePortal = new TemplatePortal(this.loadingTemplate, this.viewContainerRef);
        this.overlayRef = this.overlay.create(this.getOverlayConfig());

        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef
                .attachments()
                .pipe(takeUntil(this.destroy))
                .subscribe(() => {
                    this.notFullOverlay();
                    this.parentResizeObserver();
                });
            this.overlayRef.attach(this.templatePortal);
        }
    }

    private getOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay.position().global();
        return new OverlayConfig({
            positionStrategy,
            hasBackdrop: false,
            disposeOnNavigation: true,
            width: '100vw',
            height: '100vh',
        });
    }

    private disposeOverlay(): void {
        this.overlayRef?.dispose();
        this.overlayRef = null;
        this.resizeObserver?.disconnect();
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

    private notFullOverlay(): void {
        if (!this.inline) {
            return;
        }
        if (this.overlayRef) {
            const parentElement = this.elementRef.nativeElement.parentElement;
            if (!parentElement) {
                return;
            }
            this.overlayRef.updateSize({
                width: parentElement.clientWidth,
                height: parentElement.clientHeight,
            });
            const positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(parentElement)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top',
                        offsetX: 0,
                        offsetY: 0,
                    },
                ]);
            this.overlayRef.updatePositionStrategy(positionStrategy);
        }
    }

    private parentResizeObserver(): void {
        if (!this.inline) {
            return;
        }
        if (this.overlayRef) {
            const parentElement = this.elementRef.nativeElement.parentElement;
            if (!parentElement) {
                return;
            }
            this.resizeObserver = new ResizeObserver(([entry]) => {
                // const { width, height } = entry.contentRect;
                // 处理div大小变化的逻辑
                this.notFullOverlay();
            });
            // 开始监听父元素的大小变化
            this.resizeObserver.observe(parentElement);
        }
    }
}
