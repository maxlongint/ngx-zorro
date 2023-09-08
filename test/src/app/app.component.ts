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
        },
        {
            type: 'select',
            label: '性别',
            key: 'sex',
            props: {
                options: [
                    { label: '男', value: '1' },
                    { label: '女', value: '2' },
                ],
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
