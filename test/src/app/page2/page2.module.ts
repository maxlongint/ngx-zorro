import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page2Component } from './page2.component';
import { RouterModule } from '@angular/router';
import { NgxDynamicFormModule } from 'ngx-zorro/dynamic-form';
import { NgxRadioComponent } from './radio.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [Page2Component, NgxRadioComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: Page2Component,
            },
        ]),
        NzRadioModule,
        ReactiveFormsModule,
        NgxDynamicFormModule.forChild({
            types: [
                {
                    type: 'radio',
                    component: NgxRadioComponent,
                },
            ],
        }),
    ],
})
export class Page2Module {}
