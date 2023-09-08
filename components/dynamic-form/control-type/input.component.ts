import { Component } from '@angular/core';
import { FormControlType } from '../core/form-control-type';
import { FormFieldConfig } from '../core/field';

interface InputProps {}

@Component({
    selector: 'ngx-input',
    template: `
        <input nz-input [formControl]="formControl" [placeholder]="placeholder" />
    `,
})
export class NgxInputComponent extends FormControlType<FormFieldConfig<InputProps>> {}
