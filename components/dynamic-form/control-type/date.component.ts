import { Component } from '@angular/core';
import { FormControlType } from '../core/form-control-type';

@Component({
    selector: 'ngx-date',
    template: `
        <nz-date-picker
            style="width: 100%"
            [formControl]="formControl"
            [nzPlaceHolder]="placeholder"
            [nzMode]="mode"
        ></nz-date-picker>
    `,
})
export class NgxDateComponent extends FormControlType {
    get mode(): 'date' | 'week' | 'month' | 'year' {
        return this.props?.mode ?? 'date';
    }
}
