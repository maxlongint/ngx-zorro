import { Component } from '@angular/core';
import { FormControlType } from '../core/form-control-type';
import { FormFieldConfig } from '../core/field';

interface SelectProps {
    options?: { label: string; value: any }[];
    allowClear?: boolean;
}

@Component({
    selector: 'ngx-select',
    template: `
        <nz-select [formControl]="formControl" [nzPlaceHolder]="placeholder" [nzAllowClear]="allowClear">
            <ng-container *ngFor="let item of options">
                <nz-option [nzValue]="item.value" [nzLabel]="item.label"></nz-option>
            </ng-container>
        </nz-select>
    `,
    styles: [],
})
export class NgxSelectComponent extends FormControlType<FormFieldConfig<SelectProps>> {
    get options() {
        return this.props?.options ?? [];
    }

    get allowClear() {
        return this.props?.allowClear ?? false;
    }

    get placeholder() {
        if (this.disabled) {
            return '';
        }
        return this.fieldConfig.placeholder ?? `请选择${this.label || ''}`;
    }
}
