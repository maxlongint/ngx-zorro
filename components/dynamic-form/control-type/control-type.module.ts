import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [InputComponent],
    imports: [CommonModule, NzInputModule, ReactiveFormsModule],
    exports: [InputComponent],
})
export class NgxControlTypeModule {}
