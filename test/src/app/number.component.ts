import { Component } from '@angular/core';
import { FormControlType } from 'ngx-zorro/dynamic-form/core/form-control-type';

@Component({
    selector: 'ngx-number',
    template: `
        <nz-input-number
            style="width: 100%"
            [formControl]="formControl"
            [nzPlaceHolder]="placeholder"
            [nzMin]="min"
            [nzMax]="max"
        ></nz-input-number>
    `,
})
export class NgxNumberComponent extends FormControlType {
    get min() {
        return this.props?.min ?? Number.MIN_VALUE;
    }
    get max() {
        return this.props?.max ?? Number.MAX_VALUE;
    }
}
