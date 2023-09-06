import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgxLoadingService } from 'ngx-zorro/loading/loading.service';
import { FormFieldConfig, FormFieldConfigs } from 'ngx-zorro/dynamic-form/core/field';
import { NgxDynamicFormComponent } from 'ngx-zorro/dynamic-form';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentInit {
    constructor(
        private http: HttpClient,
        private loading: NgxLoadingService,
    ) {}

    visible = false;
    dialogVisible = false;
    title?: string;

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
            validatorScript: (control, fields) => {
                const name2 = fields.find(f => f.key === 'name2');
                if (name2) {
                    name2.hidden = !control.value;
                }
            },
        },
        {
            type: 'input',
            label: '曾用名',
            key: 'name2',
            labelStyle: {
                width: '160px',
            },
            inputStyle: {
                width: '200px',
            },
        },
        {
            type: 'input',
            label: '身份证号',
            key: 'idCard',
            labelStyle: {
                width: '160px',
            },
            inputStyle: {
                width: '200px',
            },
            validatorScript: (control, fields) => {
                if (control.value && control.value.length !== 18) {
                    return '身份证号必须是18位';
                }
                return;
            },
        },
        {
            type: 'input',
            label: '手机号',
            key: 'phone',
            labelStyle: {
                width: '160px',
            },
            inputStyle: {
                width: '200px',
            },
        },
        {
            type: 'input',
            label: '邮箱',
            key: 'email',
            labelStyle: {
                width: '160px',
            },
            inputStyle: {
                width: '200px',
            },
        },
        {
            type: 'input',
            label: '地址',
            key: 'address',
            labelStyle: {
                width: '160px',
            },
            inputStyle: {
                width: '200px',
            },
        },
        {
            type: 'input',
            label: '备注',
            key: 'remark',
            labelStyle: {
                width: '160px',
            },
            inputStyle: {
                width: '200px',
            },
        },
        {
            type: 'input',
            label: '备注2',
            key: 'remark2',
            labelStyle: {
                width: '160px',
            },
            inputStyle: {
                width: '200px',
            },
        },
    ];

    data = {
        name: '张三',
    };

    @ViewChild('formEditor') formEditor!: NgxDynamicFormComponent;

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngAfterContentInit(): void {
        this.data = null as any;
    }

    onLoading() {
        const loading = this.loading.open();

        setTimeout(() => {
            loading.close();
        }, 3000);
    }

    onDialog() {
        this.dialogVisible = true;
    }

    submit() {
        const data = this.formEditor.getRawValue();
        console.dir(data);
    }
}
