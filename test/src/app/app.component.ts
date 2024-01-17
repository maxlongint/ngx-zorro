import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgxLoadingService } from 'ngx-zorro/loading/loading.service';
import { FormFieldConfig, FormFieldConfigs } from 'ngx-zorro/dynamic-form/core/field';
import { NgxDynamicFormComponent } from 'ngx-zorro/dynamic-form';
import { AbstractControl } from '@angular/forms';
import { SelectProps } from './page1/select.component';

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
            // required: true,
            triggerScript: (control: AbstractControl, fields: FormFieldConfig[]) => {
                const age = fields.find(f => f.key === 'age');
                if (age) {
                    age.required = control.value === '22';
                }
            },
        },
        {
            type: 'input',
            label: '年龄',
            key: 'age',
            verifyScript: (control: AbstractControl, fields: FormFieldConfig<SelectProps>[]) => {
                return control.value == '20' ? {} : { error: true, message: '年龄必须是20' };
            },
        },
        // 再构造10个字段
        ...Array.from({ length: 10 }).map((_, index) => {
            return {
                type: 'input',
                label: `字段${index + 1}`,
                key: `field${index + 1}`,
            };
        }),
        {
            type: 'input',
            label: '性别',
            key: 'sex',
            required: true,
        },
    ];

    data = {
        name: '张三',
    };

    disabled = false;

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
        const data = this.formEditor.getRawValue(true);
        console.dir(JSON.stringify(data, null, 4));
    }
}
