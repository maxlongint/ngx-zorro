import { Directive, Inject, Input, Optional } from '@angular/core';
import { FORM_FIELD_CONFIG, FormFieldConfig } from './field';
import { FormControl } from '@angular/forms';

@Directive()
export abstract class FormControlType<F extends FormFieldConfig = FormFieldConfig> {
    constructor(@Optional() @Inject(FORM_FIELD_CONFIG) protected fieldConfig: F) {}

    get field(): F {
        return this.fieldConfig;
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

    get disabled(): boolean {
        return this.fieldConfig.disabled ?? false;
    }

    get required(): boolean {
        return this.fieldConfig.required ?? false;
    }

    get hidden(): boolean {
        return this.fieldConfig.hidden ?? false;
    }

    get placeholder(): string {
        if (this.disabled) {
            return '';
        }
        return this.fieldConfig.placeholder ?? `请填写${this.label || ''}`;
    }

    get props(): F['props'] {
        return this.fieldConfig.props ?? {};
    }
}
