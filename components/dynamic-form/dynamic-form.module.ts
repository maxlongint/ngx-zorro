import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDynamicFormComponent } from './dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
    declarations: [NgxDynamicFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzInputNumberModule,
        NzCheckboxModule,
        NzRadioModule,
        NzSelectModule,
        NzDatePickerModule,
    ],
    exports: [NgxDynamicFormComponent],
})
export class NgxDynamicFormModule {}
