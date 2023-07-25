import { Component, TemplateRef, ViewChild, OnInit, AfterContentInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormItemType, IFormItem } from 'components/core/tree';
import { NgxDynamicFormComponent } from 'components/dynamic-form';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit {
    visible = false;
    fieldList: Array<IFormItem> = [];

    data = {
        A0101: '张三',
    };

    @ViewChild('definedTemplate', { static: true }) definedTemplate!: TemplateRef<any>;
    @ViewChild('dynamicFormElement', { static: true }) dynamicFormElement!: NgxDynamicFormComponent;
    ngOnInit(): void {
        this.fieldList = [
            {
                label: '姓名',
                controlName: 'A0101',
                type: FormItemType.text,
                required: true,
            },
            {
                label: '曾用名',
                controlName: 'A0102',
                type: FormItemType.text,
                validatorScript: (control: AbstractControl, fields: IFormItem[]) => {
                    const A0103 = fields.find(item => item.controlName === 'A0103');
                    if (A0103) {
                        A0103.hidden = !control.value;
                    }
                    return {};
                },
            },
            {
                label: '曾用名改名时间',
                controlName: 'A0103',
                type: FormItemType.text,
            },
            {
                label: '出生日期',
                controlName: 'A0104',
                type: FormItemType.date,
            },
            {
                label: '年龄',
                controlName: 'A0105',
                type: FormItemType.number,
                min: 18,
            },
            {
                controlName: 'A0106',
                type: FormItemType.checkbox,
                options: [
                    { label: '打球', value: '01' },
                    { label: '跳舞', value: '02' },
                    { label: 'rap', value: '03' },
                ],
                defaultValue: ['01', '03'],
            },
            {
                controlName: 'A0107',
                type: FormItemType.radio,
                options: [
                    { label: '打球', value: '01' },
                    { label: '跳舞', value: '02' },
                    { label: 'rap', value: '03' },
                ],
            },
            {
                label: '兴趣爱好',
                controlName: 'A0108',
                type: FormItemType.select,
                options: [
                    { label: '打球', value: '01' },
                    { label: '跳舞', value: '02' },
                    { label: 'rap', value: '03' },
                ],
                showSearch: true,
            },
            {
                label: '备注',
                controlName: 'A0109',
                type: FormItemType.textarea,
            },
            {
                label: '自定义类型',
                controlName: 'A0190',
                type: FormItemType.defined,
                template: this.definedTemplate,
                required: true,
            },
        ];
    }

    ngAfterContentInit(): void {
        this.dynamicFormElement.setData(this.data);
    }

    submit() {
        const data = this.dynamicFormElement.getData();
        if (data) {
            console.log(data);
        }
    }
}
