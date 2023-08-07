import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzDestroyService } from 'ng-zorro-antd/core/services';

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

    constructor() {}

    ngOnInit(): void {}

    // 定义ControlValueAccessor提供的事件回调
    value!: string | null;
    onChange: (value: string | null) => void = () => null;
    onTouched: () => void = () => null;

    writeValue(obj: any): void {}
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
}
