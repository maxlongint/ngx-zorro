import { Component, OnInit } from '@angular/core';
import { FormFieldConfigs } from 'ngx-zorro/dynamic-form/core/field';

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
            required: true,
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
        },
    ];

    ngOnInit(): void {}
}
