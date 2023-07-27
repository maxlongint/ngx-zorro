import { Component, TemplateRef, ViewChild, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IFormItem, FormItemType } from 'ngx-zorro/core/tree';
import { NgxDynamicFormComponent } from 'ngx-zorro/dynamic-form';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentInit {
    visible = false;
    fieldList: Array<IFormItem> = [];

    data = {
        A0101: '张三',
    };

    @ViewChild('definedTemplate', { static: true }) definedTemplate!: TemplateRef<any>;
    @ViewChild('dynamicFormElement') dynamicFormElement!: NgxDynamicFormComponent;
    ngOnInit(): void {
        this.fieldList = [
            {
                label: '姓名',
                labelWidth: '160px',
                inputWidth: '200px',
                controlName: 'A0101',
                type: FormItemType.text,
                required: true,
            },
            {
                label: '曾用名',
                labelWidth: '160px',
                inputWidth: '200px',
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
                labelWidth: '160px',
                inputWidth: '200px',
                controlName: 'A0103',
                type: FormItemType.text,
            },
            {
                label: '出生日期',
                labelWidth: '160px',
                inputWidth: '200px',
                controlName: 'A0104',
                type: FormItemType.date,
            },
            {
                label: '年龄',
                labelWidth: '160px',
                inputWidth: '200px',
                controlName: 'A0105',
                type: FormItemType.number,
                min: 18,
            },
            {
                controlName: 'A0106',
                labelWidth: '160px',
                inputWidth: '200px',
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
                labelWidth: '160px',
                inputWidth: '200px',
                type: FormItemType.radio,
                options: [
                    { label: '打球', value: '01' },
                    { label: '跳舞', value: '02' },
                    { label: 'rap', value: '03' },
                ],
            },
            {
                label: '兴趣爱好',
                labelWidth: '160px',
                inputWidth: '200px',
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
                labelWidth: '160px',
                inputWidth: '200px',
                controlName: 'A0109',
                type: FormItemType.textarea,
            },
            {
                label: '自定义类型',
                labelWidth: '160px',
                inputWidth: '200px',
                controlName: 'A0190',
                type: FormItemType.defined,
                template: this.definedTemplate,
                required: true,
            },
        ];
    }

    ngAfterViewInit(): void {
        // setTimeout(() => {
        //     this.dynamicFormElement.setData({ A0190: '1' });
        // }, 100);
    }

    ngAfterContentInit(): void {}

    submit() {
        const data = this.dynamicFormElement.getData();
        if (data) {
            console.log(data);
        }
    }
    open() {
        this.visible = true;
    }
}
