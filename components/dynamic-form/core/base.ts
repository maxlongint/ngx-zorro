import { InjectionToken, Type } from '@angular/core';
import { FormControlType } from './form-control-type';

export const FORM_CONFIG = new InjectionToken<FormConfig[]>('FORM_CONFIG');

export interface ControlType {
    type: string;
    component: Type<FormControlType>;
}

export type ControlTypes = ControlType[];

export interface FormConfig {
    types: ControlTypes;
}
