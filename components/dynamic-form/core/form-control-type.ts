import { Directive, Inject, Optional } from '@angular/core';
import { FORM_FIELD_CONFIG, FormFieldConfig } from './field';
import { FormControl } from '@angular/forms';

@Directive()
export abstract class FormControlType<F extends FormFieldConfig = FormFieldConfig> {
    constructor(@Optional() @Inject(FORM_FIELD_CONFIG) protected fieldConfig: F) {}

    get field(): F {
        return this.fieldConfig;
    }

    get props(): F['props'] {
        return this.fieldConfig.props ?? {};
    }

    get key(): string {
        return this.fieldConfig.key;
    }

    get label(): string {
        return this.fieldConfig.label ?? '';
    }

    get formControl(): FormControl {
        return this.fieldConfig.formControl!;
    }

    get placeholder(): string {
        return this.fieldConfig.placeholder ?? `请填写${this.label || ''}`;
    }
}
