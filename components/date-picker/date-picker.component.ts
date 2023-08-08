import { CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    Component,
    ElementRef,
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
import { Subject, fromEvent, merge } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { format, parseISO } from 'date-fns';

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
     * 显示格式;例如: yyyy-MM-dd
     */
    @Input() formatText = 'yyyy-MM-dd';
    /**
     * 结果格式;例如: yyyy-MM-dd
     * 如果为空则返回日期Date对象
     */
    @Input() formatValue?: string;
    /**
     * 显示模式 （参考 nz-date-picker 的nzMode）
     */
    @Input() mode: 'date' | 'month' | 'year' = 'date';

    constructor(
        private destroy: NzDestroyService,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.formatDateToString();
    }

    // 定义ControlValueAccessor提供的事件回调
    value!: string | null;
    onChange: (value: string | Date | null) => void = () => null;
    onTouched: () => void = () => null;

    writeValue(obj: any): void {
        this.value = obj;
        if (obj) {
            this.date = new Date(obj);
            this.text = format(this.date, this.formatText);
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
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
     * input显示内容
     */
    text?: string;
    /**
     * nz-date-picker值
     */
    date?: Date;
    /**
     * overlay浮层是否显示
     */
    visible = false;
    /**
     * 日期格式化
     */
    format$ = new Subject<any>();
    /**
     * 时间选择面板关闭触发
     */
    close$ = new Subject<void>();

    open() {
        if (this.disabled) {
            return;
        }
        this.attachOverlay();
        this.visible = true;
        this.updateInputState();
        this.updateOverlayStyle();
        this.updateBodyOverflow();
    }

    close() {
        this.visible = false;
        this.close$.next();
        this.updateInputState();
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.disposeOverlay();
    }

    clear() {
        this.text = undefined;
        this.date = undefined;
        this.value = null;
        this.onChange(this.value);
    }

    private attachOverlay(): void {
        this.templatePortal = new TemplatePortal(this.dateTimePickerTemplate, this.viewContainerRef);
        this.overlayRef = this.overlay.create(this.getOverlayConfig());

        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attachments().subscribe(() => {
                this.onListenKeyDown();
            });
            this.overlayRef.attach(this.templatePortal);
            this.overlayRef
                .outsidePointerEvents()
                .pipe(takeUntil(this.destroy))
                .subscribe((event: MouseEvent) => {
                    // 点击的是input则不做处理
                    if (this.inputElement.nativeElement === event.target) {
                        this.updateInputState();
                        event.stopPropagation();
                        return;
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
        if (this.visible) {
            inputElement.focus();
        } else {
            inputElement.blur();
        }
    }

    /**
     * 监听input的回车和失去焦点事件，触发格式化
     */
    private onListenKeyDown() {
        const blur = fromEvent(this.inputElement.nativeElement, 'blur');
        const enter = fromEvent(this.inputElement.nativeElement, 'keydown').pipe(
            filter((event: any) => event.key === 'Enter')
        );
        merge(blur, enter)
            .pipe(takeUntil(this.close$))
            .subscribe(() => {
                if (this.text) {
                    const dateTime = parseISO(this.text);
                    if (dateTime.getTime()) {
                        this.format$.next(dateTime);
                    } else {
                        this.clear();
                    }
                }
            });
    }

    private formatDateToString() {
        this.format$.pipe(takeUntil(this.destroy)).subscribe(date => {
            this.value = date;
            if (this.formatValue) {
                this.value = format(date, this.formatValue);
            }
            this.text = format(date, this.formatText);
            this.date = date;
            this.onChange(this.value);
            this.close();
        });
    }

    onPickerChange(value: Date) {
        this.format$.next(value);
    }
}
