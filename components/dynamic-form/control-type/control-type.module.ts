import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxInputComponent } from './input/input.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxNumberComponent } from './number/number.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
    declarations: [NgxInputComponent, NgxNumberComponent],
    imports: [CommonModule, ReactiveFormsModule, NzInputModule, NzInputNumberModule],
    exports: [NgxInputComponent, NgxNumberComponent],
})
export class NgxControlTypeModule {}
