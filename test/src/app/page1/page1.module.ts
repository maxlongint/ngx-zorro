import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page1Component } from './page1.component';
import { RouterModule } from '@angular/router';
import { NgxSelectComponent } from './select.component';
import { NgxDynamicFormModule } from 'ngx-zorro/dynamic-form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@NgModule({
    declarations: [Page1Component, NgxSelectComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: Page1Component,
            },
        ]),
        NzSelectModule,
        ReactiveFormsModule,
        NgxDynamicFormModule.forChild({
            types: [
                {
                    type: 'select',
                    component: NgxSelectComponent,
                },
            ],
        }),
        NzDrawerModule,
    ],
})
export class Page1Module {}
