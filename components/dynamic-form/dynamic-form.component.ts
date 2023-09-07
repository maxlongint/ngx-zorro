import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FORM_FIELD_CONFIG, FormFieldConfig, FormFieldConfigs, ValidatorScriptFn } from './core/field';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
    ) {}

    trackByFields = (index: number, f: FormFieldConfig) => f.id;

    formGroup = new FormGroup({});

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.fields) {
            this.createFormControl();
        }
        if (changes.data) {
            this.reset(this.data);
        }
    }

    /**
     * 重置表单
     * @param data
     */
    public reset(data?: Record<string, any>) {
        this.formGroup.reset(data ?? undefined);
    }

    /**
     * 设置表单数据
     * @param data
     */
    public patchValue(data: Record<string, any>) {
        this.formGroup.patchValue(data);
    }

    /**
     * 获取表单数据
     */
    public getRawValue(): Record<string, any> | false {
        const form = this.formGroup;
        const errList = [];
        for (const i in form.controls) {
            form.controls[i].markAsDirty();
            form.controls[i].updateValueAndValidity();
            if (form.controls[i].status !== 'VALID' && form.controls[i].status !== 'DISABLED') {
                errList.push({ field: i, error: '校验不通过' });
            }
        }
        // 表单验证状态
        if (form.status !== 'VALID') {
            console.table(errList);
            return false;
        }
        return form.getRawValue();
    }

    private createFormControl(): void {
        this.fields.forEach(f => {
            f.formControl = new FormControl();
            if (this.disabled) {
                f.disabled = true;
            }
            if (f.disabled) {
                f.formControl.disable();
            }
            this.formGroup.addControl(f.key, f.formControl);
            this.loadDynamicComponent(f);
        });
        this.setFormControlValidators();
    }

    private loadDynamicComponent(f: FormFieldConfig): void {
        if (f.type) {
            if (!f.component) {
                f.component = this.service.getType(f.type);
                if (!f.component) {
                    throw new Error(`Can't find component for type ${f.type}`);
                }
            }
            // 创建动态注入器，并传递数据
            f.injector = Injector.create({
                providers: [{ provide: FORM_FIELD_CONFIG, useValue: f }],
                parent: this.injector,
            });
        }
    }

    private setFormControlValidators() {
        this.fields.forEach(f => {
            const control = this.formGroup.get(f.key);
            if (control) {
                const validators: Array<ValidatorFn> = this.addControlValidators(f);
                control.setValidators(validators);
            }
        });
    }

    private addControlValidators(f: FormFieldConfig): Array<ValidatorFn> {
        const validators: Array<ValidatorFn> = [];
        if (f.required) {
            validators.push(Validators.required);
        }
        if (f.validatorScript) {
            let fn: Function = f.validatorScript as ValidatorScriptFn;
            if (Object.prototype.toString.call(f.validatorScript) !== '[object Function]') {
                fn = new Function('control', 'fields', f.validatorScript as string);
            }
            // 校验脚本传递额参数： control, fields
            const validatorFn = (control: AbstractControl) => {
                const error = fn(control, this.fields);
                if (error) {
                    return { uncertainty: true, message: error };
                }
                return {};
            };
            validators.push(validatorFn);
        }
        return validators;
    }
}
