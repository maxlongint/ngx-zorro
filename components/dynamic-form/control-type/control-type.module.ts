import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxInputComponent } from './input.component';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
    declarations: [NgxInputComponent],
    imports: [CommonModule, ReactiveFormsModule, NzInputModule],
    exports: [NgxInputComponent],
})
export class NgxControlTypeModule {}
