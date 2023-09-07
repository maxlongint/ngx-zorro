import { Component } from '@angular/core';
import { FormControlType } from '../../core/form-control-type';

@Component({
    selector: 'ngx-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
})
export class NgxDateComponent extends FormControlType {
    get mode(): 'date' | 'week' | 'month' | 'year' {
        return this.props?.mode ?? 'date';
    }
}
