import { Component, OnInit } from '@angular/core';
import { FormControlType } from 'ngx-zorro/dynamic-form/core/form-control-type';
import { FormFieldConfig } from 'ngx-zorro/dynamic-form/core/field';

interface RadioProps {
    options?: { label: string; value: any }[];
}

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
})
export class RadioComponent extends FormControlType<FormFieldConfig<RadioProps>> implements OnInit {
    ngOnInit(): void {}

    get options() {
        return this.props?.options ?? [];
    }
}
