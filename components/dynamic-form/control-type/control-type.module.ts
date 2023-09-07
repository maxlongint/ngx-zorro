import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxInputComponent } from './input/input.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [NgxInputComponent],
    imports: [CommonModule, NzInputModule, ReactiveFormsModule],
    exports: [NgxInputComponent],
})
export class NgxControlTypeModule {}
