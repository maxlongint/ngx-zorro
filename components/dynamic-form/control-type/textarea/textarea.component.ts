import { Component } from '@angular/core';
import { FormControlType } from '../../core/form-control-type';

@Component({
    selector: 'ngx-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
})
export class NgxTextareaComponent extends FormControlType {
    get rows(): number {
        return this.props?.rows ?? 4;
    }
}
