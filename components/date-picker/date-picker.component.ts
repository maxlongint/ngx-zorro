import { CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
    Component,
    ElementRef,
    Inject,
    Input,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ngx-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [
        NzDestroyService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxDatePickerComponent),
            multi: true,
        },
    ],
})
export class NgxDatePickerComponent implements OnInit, ControlValueAccessor {
    /**
     * 是否只读
     */
    @Input() disabled = false;
    /**
     * 录入提示信息
     */
    @Input() placeholder = '请填写';
    /**
     * 显示格式
     */
    @Input() formatText = 'YYYY-MM-DD';
    /**
     * 结果格式
     */
    @Input() formatValue = 'YYYY-MM-DD';
    /**
     * 显示模式 （参考 nz-date-picker 的nzMode）
     */
    @Input() mode: 'date' | 'month' | 'year' = 'date';

    constructor(
        private destroy: NzDestroyService,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit(): void {}

    // 定义ControlValueAccessor提供的事件回调
    value!: string | null;
    onChange: (value: string | null) => void = () => null;
    onTouched: () => void = () => null;

    writeValue(obj: any): void {
        this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onChange = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.placeholder = '';
    }

    @ViewChild('originElement') originElement!: CdkOverlayOrigin;
    @ViewChild('dateTimePickerTemplate') dateTimePickerTemplate!: TemplateRef<ElementRef>;
    @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

    /**
     * 浮层对象
     */
    overlayRef?: OverlayRef;
    /**
     * 渲染模板
     */
    templatePortal?: TemplatePortal;
    /**
     * overlay浮层是否显示
     */
    visible = false;

    open() {
        this.updateInputState();
        this.attachOverlay();
        this.visible = true;
        this.updateOverlayStyle();
        this.updateBodyOverflow();
    }

    close() {
        this.visible = false;
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.disposeOverlay();
    }

    private attachOverlay(): void {
        this.templatePortal = new TemplatePortal(this.dateTimePickerTemplate, this.viewContainerRef);
        this.overlayRef = this.overlay.create(this.getOverlayConfig());

        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attachments().subscribe(() => {});
            this.overlayRef.attach(this.templatePortal);
            this.overlayRef
                .outsidePointerEvents()
                .pipe(takeUntil(this.destroy))
                .subscribe((event: MouseEvent) => {
                    // 点击的是目标内部的元素则不做处理
                    if (this.originElement.elementRef.nativeElement.contains(event.target)) {
                        this.updateInputState();
                        return event.stopPropagation();
                    }
                    this.close();
                });
        }
    }

    private getOverlayConfig(): OverlayConfig {
        const { nativeElement } = this.originElement.elementRef;
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(nativeElement)
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom',
                    offsetX: 0,
                    offsetY: 0,
                },
            ])
            .withPush(false);
        // 这里滚动策略是不生效的，因为并不是body的滚动
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        return new OverlayConfig({
            positionStrategy,
            scrollStrategy,
            hasBackdrop: false,
            disposeOnNavigation: true,
        });
    }

    private disposeOverlay(): void {
        this.overlayRef?.dispose();
        this.overlayRef = undefined;
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

    private updateInputState() {
        const inputElement = this.inputElement.nativeElement;
        inputElement.focus();
    }
}
