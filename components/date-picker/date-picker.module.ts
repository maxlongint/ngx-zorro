import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatePickerComponent } from './date-picker.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [NgxDatePickerComponent],
    imports: [CommonModule, NzInputModule, NzIconModule, FormsModule],
    exports: [NgxDatePickerComponent],
})
export class NgxDatePickerModule {}
