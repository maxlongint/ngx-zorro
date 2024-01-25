import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormFieldConfig, FormFieldConfigs } from 'ngx-zorro/dynamic-form/core/field';
import { AbstractControl } from '@angular/forms';
import { SelectProps } from './select.component';
import { NgxDynamicFormComponent } from 'ngx-zorro/dynamic-form';

@Component({
    selector: 'app-page1',
    templateUrl: './page1.component.html',
    styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit, AfterViewInit {
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

    @ViewChild('formEditor') formEditor!: NgxDynamicFormComponent;

    ngOnInit(): void {}

    ngAfterViewInit() {
        // this.formEditor.patchValue(this.data);

        setTimeout(() => {
            this.formEditor.patchValue({
                name: '张三1',
                sex: '1',
                sex_CN: '男',
            });
        }, 2000);
    }
}
