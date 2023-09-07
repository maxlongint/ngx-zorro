import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxInputComponent } from './input/input.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxNumberComponent } from './number/number.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NgxDateComponent } from './date/date.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NgxTextareaComponent } from './textarea/textarea.component';

@NgModule({
    declarations: [NgxInputComponent, NgxNumberComponent, NgxDateComponent, NgxTextareaComponent],
    imports: [CommonModule, ReactiveFormsModule, NzInputModule, NzInputNumberModule, NzDatePickerModule],
    exports: [NgxInputComponent, NgxNumberComponent, NgxDateComponent, NgxTextareaComponent],
})
export class NgxControlTypeModule {}
