import { Component } from '@angular/core';
import { FormControlType } from '../core/form-control-type';

@Component({
    selector: 'ngx-textarea',
    template: `
        <textarea [rows]="rows" nz-input [formControl]="formControl"></textarea>
    `,
})
export class NgxTextareaComponent extends FormControlType {
    get rows(): number {
        return this.props?.rows ?? 4;
    }
}
