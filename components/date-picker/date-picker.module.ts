import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatePickerComponent } from './date-picker.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
    declarations: [NgxDatePickerComponent],
    imports: [CommonModule, FormsModule, OverlayModule, NzInputModule, NzIconModule, NzDatePickerModule],
    exports: [NgxDatePickerComponent],
})
export class NgxDatePickerModule {}
