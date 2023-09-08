import { Component } from '@angular/core';
import { FormControlType } from '../core/form-control-type';

@Component({
    selector: 'ngx-input',
    template: `
        <input nz-input [formControl]="formControl" [placeholder]="placeholder" />
    `,
})
export class NgxInputComponent extends FormControlType {}
