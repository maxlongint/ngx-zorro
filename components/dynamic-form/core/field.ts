import { AbstractControl, FormControl } from '@angular/forms';
import { InjectionToken, Injector, TemplateRef, Type } from '@angular/core';
import { FormControlType } from './form-control-type';
import { NgStyle } from '@angular/common';

export const FORM_FIELD_CONFIG = new InjectionToken<FormFieldConfig[]>('FORM_FIELD_CONFIG');

export interface FormFieldConfig {
    type: string;
    key: string;
    id?: string;
    label?: string;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    hidden?: boolean;
    labelStyle?: { [cssName: string]: any };
    inputStyle?: { [cssName: string]: any };
    component?: Type<FormControlType>;
    injector?: Injector;
    formControl?: FormControl;
    errorTemplate?: TemplateRef<any>;
    validatorScript?: ValidatorScript;
}

export type ValidatorScript = string | ValidatorScriptFn;
export type ValidatorScriptFn = (control: AbstractControl, fields: FormFieldConfig[]) => string | void;

export type FormFieldConfigs = FormFieldConfig[];
