import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormItemType, IFormItem, IFormItemCheckbox, ValidatorScriptFn } from 'ngx-zorro/core/tree';
import { IFormData, IFormDataFn } from 'ngx-zorro/core/tree';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface IFormItemControl {
    $implicit?: AbstractControl;
    context: IFormItem;
    template: TemplateRef<any> | null;
}

@Component({
    selector: 'ngx-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
})
export class NgxDynamicFormComponent implements OnInit, OnChanges, OnDestroy {
    /**
     * 字段列表
     */
    private _fields: Array<IFormItem> = [];
    @Input() set fields(value: Array<IFormItem>) {
        this._fields = value;
        this.fieldConfigs = value.map(item => {
            if (!item.id) {
                item.id = Array.from(item.controlName, c => c.charCodeAt(0)).join('');
            }
            return { context: item, template: null };
        });
    }
    get fields(): Array<IFormItem> {
        return this._fields;
    }

    /**
     * 设置值
     * 示例1: { name: '小明'}
     * 示例2: (form: FormGroup) => { form.patchValue('小明') }
     */
    @Input() formData: IFormData;

    constructor() {
        this.setDataSubscription = this.setData$
            .pipe(filter(() => Object.keys(this.formGroup.controls).length !== 0))
            .subscribe(data => {
                if (Object.prototype.toString.call(data) === '[object Function]') {
                    const fn = data as IFormDataFn;
                    fn(this.formGroup);
                } else {
                    this.formGroup.reset(data);
                }
            });
    }

    formGroup = new FormGroup({});
    private setData$ = new Subject<IFormData>();
    private setDataSubscription?: Subscription;

    fieldConfigs: Array<IFormItemControl> = [];
    trackByFields = (index: number, item: IFormItemControl) => item.context.id;

    @ViewChild('textTemplate', { static: true }) private textTemplate!: TemplateRef<any>;
    @ViewChild('numberTemplate', { static: true }) private numberTemplate!: TemplateRef<any>;
    @ViewChild('dateTemplate', { static: true }) private dateTemplate!: TemplateRef<any>;
    @ViewChild('radioTemplate', { static: true }) private radioTemplate!: TemplateRef<any>;
    @ViewChild('checkboxTemplate', { static: true }) private checkboxTemplate!: TemplateRef<any>;
    @ViewChild('textareaTemplate', { static: true }) private textareaTemplate!: TemplateRef<any>;
    @ViewChild('selectTemplate', { static: true }) private selectTemplate!: TemplateRef<any>;

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.fields) {
            if (changes.fields.currentValue) {
                this.setFormControl();
            }
        }
    }

    ngOnDestroy(): void {
        this.setDataSubscription?.unsubscribe();
    }

    /**
     * 开始构造表单
     */
    public setFormControl() {
        this.fieldConfigs.forEach(field => {
            if (!field.context?.placeholder) {
                field.context.placeholder = `请填写${field.context.label || ''}`;
            }
            field.$implicit = new FormControl(field.context.defaultValue || null);
            if (field.context.disabled) {
                field.context.placeholder = '';
                field.$implicit.disable();
            }
            this.formGroup.addControl(field.context.controlName, field.$implicit);
            switch (field.context.type) {
                case FormItemType.text:
                    field.template = this.textTemplate;
                    break;
                case FormItemType.number:
                    field.template = this.numberTemplate;
                    break;
                case FormItemType.date:
                    field.template = this.dateTemplate;
                    break;
                case FormItemType.radio:
                    field.template = this.radioTemplate;
                    break;
                case FormItemType.checkbox:
                    this.setFormControlCheckbox(field);
                    field.template = this.checkboxTemplate;
                    break;
                case FormItemType.select:
                    if (!field.context.required && !field.context.hasOwnProperty('allowClear')) {
                        field.context.allowClear = true;
                    }
                    field.template = this.selectTemplate;
                    break;
                case FormItemType.textarea:
                    if (!field.context.rows) {
                        field.context.rows = 4;
                    }
                    field.template = this.textareaTemplate;
                    break;
                case FormItemType.defined:
                    field.template = field.context.template;
                    break;
            }
        });
        this.setFormControlValidators();
        this.setData$.next(this.formData);
    }

    /**
     * 设置表单的值
     * @param data 值
     */
    public setData(data: IFormData) {
        this.formData = data;
        this.setData$.next(this.formData);
    }

    /**
     * 获取表单的值（验证不通过返回false，通过返回具体的值）
     */
    public getData(): Record<string, any> | false {
        const form = this.formGroup;
        const errList = [];
        for (const i in form.controls) {
            form.controls[i].markAsDirty();
            form.controls[i].updateValueAndValidity();
            if (form.controls[i].status !== 'VALID' && form.controls[i].status !== 'DISABLED') {
                errList.push({ 前端校验不通过字段: i });
            }
        }
        // 表单验证状态
        if (form.status !== 'VALID') {
            console.table(errList);
            return false;
        }
        const data = form.getRawValue();
        return data;
    }

    private setFormControlValidators() {
        this.fieldConfigs.forEach(field => {
            const control = this.formGroup.get(field.context.controlName);
            if (control) {
                const validators: Array<ValidatorFn> = this.addControlValidators(field);
                control.setValidators(validators);
            }
        });
    }

    private addControlValidators(field: IFormItemControl): Array<ValidatorFn> {
        const validators: Array<ValidatorFn> = [];
        if (field.context.required) {
            validators.push(Validators.required);
        }
        if (field.context.validatorScript) {
            let fn: Function = field.context.validatorScript as ValidatorScriptFn;
            if (Object.prototype.toString.call(field.context.validatorScript) !== '[object Function]') {
                fn = new Function('control', 'fields', field.context.validatorScript as string);
            }
            // 校验脚本传递额参数： control, fields
            validators.push((control: AbstractControl) => fn(control, this.fields));
        }
        return validators;
    }

    private setFormControlCheckbox(field: IFormItemControl) {
        const context = field.context as IFormItemCheckbox;
        if (!context.controlArray) {
            context.controlArray = new FormArray([]);
        }
        context.controlArray.valueChanges.subscribe(value => {
            const control = this.formGroup.get(field.context.controlName);
            if (control) {
                control.setValue(context.options.filter((option, index) => value[index]).map(item => item.value));
            }
        });
        context.options.forEach(option => {
            option.control = new FormControl(field.context.defaultValue === option.value);
            context.controlArray?.push(option.control);
        });
    }
}
