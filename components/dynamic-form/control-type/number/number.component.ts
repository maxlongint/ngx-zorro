import { Component } from '@angular/core';
import { FormControlType } from '../../core/form-control-type';

@Component({
    selector: 'ngx-number',
    templateUrl: './number.component.html',
    styleUrls: ['./number.component.scss'],
})
export class NgxNumberComponent extends FormControlType {
    get min() {
        return this.props?.min ?? Number.MIN_VALUE;
    }
    get max() {
        return this.props?.max ?? Number.MAX_VALUE;
    }
}
