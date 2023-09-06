import { Directive, Inject, Optional } from '@angular/core';
import { FORM_FIELD_CONFIG, FormFieldConfig } from './field';
import { AbstractControl, FormControl } from '@angular/forms';

@Directive()
export abstract class FormControlType<F extends FormFieldConfig = FormFieldConfig> {
    constructor(@Optional() @Inject(FORM_FIELD_CONFIG) protected fieldConfig: F) {}

    get label(): string | undefined {
        return this.fieldConfig?.label;
    }

    get formControl(): FormControl {
        return this.fieldConfig.formControl!;
    }
}
