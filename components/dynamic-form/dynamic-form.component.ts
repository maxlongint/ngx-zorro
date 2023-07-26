import {
    AfterContentInit,
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormItemType, IFormItem, IFormItemCheckbox, ValidatorScriptFn } from 'ngx-zorro/core/tree';
import { IFormData, IFormDataFn } from 'ngx-zorro/core/tree';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

interface IFormItemControl {
    $implicit?: AbstractControl;
    context: IFormItem;
    template: TemplateRef<any> | null;

    labelStyle?: Record<string, string>;
    inputStyle?: Record<string, string>;
}

@Component({
    selector: 'ngx-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
})
export class NgxDynamicFormComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit, OnDestroy {
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
     * 示例2: (form: FormGroup) => { form.patchValue({ name: '小明'}) }
     */
    @Input() formData: IFormData;
    /**
     * 表单布局
     * vertical:垂直布局
     * horizontal:水平布局
     * inline:水平自适应
     */
    @Input() layout: 'vertical' | 'horizontal' | 'inline' = 'vertical';

    constructor() {}

    formGroup = new FormGroup({});
    fieldConfigs: Array<IFormItemControl> = [];
    trackByFields = (index: number, item: IFormItemControl) => item.context.id;

    @ViewChild('textTemplate', { static: true }) private textTemplate!: TemplateRef<any>;
    @ViewChild('numberTemplate', { static: true }) private numberTemplate!: TemplateRef<any>;
    @ViewChild('dateTemplate', { static: true }) private dateTemplate!: TemplateRef<any>;
    @ViewChild('radioTemplate', { static: true }) private radioTemplate!: TemplateRef<any>;
    @ViewChild('checkboxTemplate', { static: true }) private checkboxTemplate!: TemplateRef<any>;
    @ViewChild('textareaTemplate', { static: true }) private textareaTemplate!: TemplateRef<any>;
    @ViewChild('selectTemplate', { static: true }) private selectTemplate!: TemplateRef<any>;

    setData$ = new BehaviorSubject<IFormData>(undefined);
    private setDataSubscription?: Subscription;

    ngOnInit(): void {
        this.setData$.pipe(distinctUntilChanged()).subscribe(data => {
            if (Object.prototype.toString.call(data) === '[object Function]') {
                const fn = data as IFormDataFn;
                fn(this.formGroup);
                return;
            }
            if (data) {
                this.formGroup.patchValue(data);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.fields) {
            if (changes.fields.currentValue) {
                this.setFormControl();
            }
        }
    }

    ngAfterViewInit(): void {}

    ngAfterContentInit(): void {
        if (this.formData) {
            this.setData$.next(this.formData);
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
            this.setFormItemStyle(field);
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
    }

    /**
     * 设置表单的值
     * 示例1: { name: '小明'}
     * 示例2: (form: FormGroup) => { form.patchValue({ name: '小明'}) }
     * @param data 值
     */
    public setData(data: IFormData) {
        this.setData$.next(data);
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

    private setFormItemStyle(field: IFormItemControl) {
        if (field.context.labelWidth) {
            if (this.layout === 'horizontal' || this.layout === 'inline') {
                field.labelStyle = { width: field.context.labelWidth };
            }
        }
        if (field.context.inputWidth) {
            if (this.layout === 'inline') {
                field.inputStyle = { width: field.context.inputWidth };
            }
        }
        if (!field.context.label) {
            if (this.layout === 'vertical') {
                field.labelStyle = { display: 'none' };
            }
        }
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
            option.control = new FormControl(field.context.defaultValue.includes(option.value));
            context.controlArray?.push(option.control);
        });
    }
}
