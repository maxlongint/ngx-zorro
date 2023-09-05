import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
    declarations: [InputComponent],
    imports: [CommonModule, NzInputModule],
    exports: [InputComponent],
})
export class NgxControlTypeModule {}
