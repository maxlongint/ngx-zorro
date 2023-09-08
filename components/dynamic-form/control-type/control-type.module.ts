import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxInputComponent } from './input.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxNumberComponent } from './number.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NgxDateComponent } from './date.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NgxTextareaComponent } from './textarea.component';
import { NgxRadioComponent } from './radio.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NgxSelectComponent } from './select.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
    declarations: [
        NgxInputComponent,
        NgxNumberComponent,
        NgxDateComponent,
        NgxTextareaComponent,
        NgxRadioComponent,
        NgxSelectComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NzInputModule,
        NzInputNumberModule,
        NzDatePickerModule,
        NzRadioModule,
        NzSelectModule,
    ],
    exports: [
        NgxInputComponent,
        NgxNumberComponent,
        NgxDateComponent,
        NgxTextareaComponent,
        NgxRadioComponent,
        NgxSelectComponent,
    ],
})
export class NgxControlTypeModule {}
