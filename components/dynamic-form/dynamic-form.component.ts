import { Component, ElementRef, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FORM_FIELD_CONFIG, FormFieldConfig, FormFieldConfigs, TriggerScriptFn, VerifyScriptFn } from './core/field';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgxDynamicFormService } from './dynamic-form.service';

@Component({
    selector: 'ngx-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
})
export class NgxDynamicFormComponent implements OnInit, OnChanges {
    _fields: FormFieldConfigs = [];
    @Input() set fields(value: FormFieldConfigs) {
        this._fields = value.map(f => {
            if (!f.id) {
                f.id = Array.from(f.key, c => c.charCodeAt(0)).join('');
            }
            return f;
        });
    }
    get fields(): FormFieldConfigs {
        return this._fields;
    }
    @Input() disabled: boolean = false;
    @Input() data?: Record<string, any>;
    @Input() layout: 'vertical' | 'horizontal' | 'inline' = 'vertical';

    constructor(
        private service: NgxDynamicFormService,
        private injector: Injector,
        private elementRef: ElementRef,
    ) {}

    trackByFields = (index: number, f: FormFieldConfig) => f.id;
    formGroup = new FormGroup({});

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.fields) {
            this.createFormControl();
            this.reset();
        }
        if (changes.data) {
            this.reset();
        }
        if (changes.disabled) {
            this.disabled ? this.formGroup.disable() : this.formGroup.enable();
        }
    }

    /**
     * 重置表单
     * @param data
     */
    public reset(data?: Record<string, any>) {
        this.data = data ?? this.data;
        this.formGroup.reset(this.data);
    }

    /**
     * 设置表单数据
     * @param data
     */
    public patchValue(data: Record<string, any>) {
        this.data = data ?? this.data;
        this.formGroup.patchValue(this.data);
    }

    /**
     * 获取表单数据
     * @param errorLocation 是否定位到错误位置
     * @param arg element.scrollIntoView 定位参数
     */
    public getRawValue<T = Record<string, any>>(errorLocation = false, arg?: ScrollIntoViewOptions): false | T {
        const form = this.formGroup;
        const errList = [];
        for (const key in form.controls) {
            form.controls[key].markAsDirty();
            form.controls[key].updateValueAndValidity();
            if (form.controls[key].status !== 'VALID' && form.controls[key].status !== 'DISABLED') {
                errList.push(key);
            }
        }
        // 表单验证状态
        if (form.status !== 'VALID') {
            if (errorLocation && errList.length > 0) {
                const element = this.elementRef.nativeElement.querySelector(`[dynamic-key="${errList[0]}"]`);
                element?.scrollIntoView(arg ?? { behavior: 'instant', block: 'nearest', inline: 'start' });
            }
            console.error(`Form validation failed fields：${errList.join(',')}`);
            return false;
        }
        return form.getRawValue();
    }

    /**
     * 手动注入数据
     */
    injectFormData(data?: Record<string, any>) {
        this.fields.forEach(f => this.injectControlData(f, data));
    }

    /**
     * 给表单项注入数据
     * @param f
     * @param data
     */
    injectControlData(f: FormFieldConfig, data: Record<string, any> = {}) {
        // 创建动态注入器，并传递数据
        f.injector = Injector.create({
            providers: [{ provide: FORM_FIELD_CONFIG, useValue: f }],
            parent: this.injector,
        });
    }

    private createFormControl(): void {
        this.fields.forEach(f => {
            f.formControl = new FormControl();
            if (this.disabled || f.disabled) {
                f.formControl.disable();
            }
            this.setControlValidators(f);
            this.setControlTrigger(f);
            this.formGroup.addControl(f.key, f.formControl);
            this.loadDynamicComponent(f);
            this.listenFieldPropertyChanges(f);
        });
    }

    private setControlValidators(f: FormFieldConfig): void {
        const validators: Array<ValidatorFn> = this.createControlValidators(f);
        if (validators.length > 0) {
            f.formControl?.setValidators(validators);
        }
    }

    private createControlValidators(f: FormFieldConfig): Array<ValidatorFn> {
        const validators: Array<ValidatorFn> = [];
        if (f.required) {
            validators.push(Validators.required);
        }
        if (f.verifyScript) {
            let fn: Function = f.verifyScript as VerifyScriptFn;
            if (Object.prototype.toString.call(f.verifyScript) !== '[object Function]') {
                fn = new Function('control', 'fields', f.verifyScript as string);
            }
            // 校验脚本传递额参数： control, fields
            const validatorFn = (control: AbstractControl) => {
                const error: ValidationErrors = fn(control, this.fields);
                const message = 'The value returned by the verification script must be of the VerifyScriptError type';
                if (Object.prototype.toString.call(error) !== '[object Object]') {
                    throw new Error(message);
                }
                return error;
            };
            validators.push(validatorFn);
        }
        return validators;
    }

    private setControlTrigger(f: FormFieldConfig): void {
        if (f.formControl) {
            if (f.triggerScript) {
                let fn: Function = f.triggerScript as TriggerScriptFn;
                if (Object.prototype.toString.call(f.triggerScript) !== '[object Function]') {
                    fn = new Function('control', 'fields', f.triggerScript as string);
                }
                f.formControl.valueChanges.subscribe(() => {
                    fn(f.formControl, this.fields);
                });
            }
        }
    }

    private loadDynamicComponent(f: FormFieldConfig): void {
        if (f.type) {
            if (!f.component) {
                f.component = this.service.getType(f.type);
                if (!f.component) {
                    throw new Error(`Can't find component for type ${f.type}`);
                }
            }
            this.injectControlData(f);
        }
    }

    // 监听一些属性的变化
    private listenFieldPropertyChanges(f: FormFieldConfig) {
        if (Object.getOwnPropertyDescriptor(f, 'required')) {
            return;
        }
        Object.defineProperties(f, {
            required: {
                set: (state: boolean) => {
                    if (state) {
                        f.formControl?.addValidators(Validators.required);
                    } else {
                        f.formControl?.removeValidators(Validators.required);
                    }
                },
                get: () => f.formControl?.hasValidator(Validators.required) ?? false,
            },
            disabled: {
                set: (state: boolean) => {
                    if (state) {
                        f.formControl?.disable();
                    } else {
                        f.formControl?.enable();
                    }
                },
                get: () => f.formControl?.disabled ?? false,
            },
        });
    }
}
