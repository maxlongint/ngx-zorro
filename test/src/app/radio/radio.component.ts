import { Component, OnInit } from '@angular/core';
import { FormControlType } from 'ngx-zorro/dynamic-form/core/form-control-type';
import { FormFieldConfig } from 'ngx-zorro/dynamic-form/core/field';

interface RadioProps {
    options?: { label: string; value: any }[];
}

@Component({
    selector: 'app-radio',
    template: `
        <nz-radio-group [formControl]="formControl">
            <ng-container *ngFor="let item of options">
                <label nz-radio [nzValue]="item.value">{{ item.label }}</label>
            </ng-container>
        </nz-radio-group>
    `,
})
export class RadioComponent extends FormControlType<FormFieldConfig<RadioProps>> implements OnInit {
    ngOnInit(): void {}

    get options() {
        return this.props?.options ?? [];
    }
}
