import { Component, OnInit } from '@angular/core';
import { FormFieldConfig, FormFieldConfigs } from 'ngx-zorro/dynamic-form/core/field';
import { AbstractControl } from '@angular/forms';
import { SelectProps } from './select.component';

@Component({
    selector: 'app-page1',
    templateUrl: './page1.component.html',
    styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit {
    constructor() {}

    fields: FormFieldConfigs = [
        {
            type: 'input',
            label: '姓名',
            key: 'name',
            // required: true,
            labelStyle: {
                width: '160px',
            },
            inputStyle: {
                width: '200px',
            },
        },
        {
            type: 'select',
            label: '性别',
            key: 'sex',
            labelStyle: {
                width: '160px',
            },
            inputStyle: {
                width: '200px',
            },
            props: {
                options: [
                    { label: '男', value: '1' },
                    { label: '女', value: '2' },
                ],
            },
            verifyScript: (control: AbstractControl, fields: FormFieldConfig<SelectProps>[]) => {
                return { uncertainty: false, message: '性别不能为空' };
            },
            triggerScript: (control: AbstractControl, fields: FormFieldConfig<SelectProps>[]) => {
                console.log(+new Date());
            },
        },
    ];

    data = {
        name: '张三',
        sex: '2',
        sex_CN: '女',
    };

    ngOnInit(): void {}
}
