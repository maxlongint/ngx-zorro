import { Injectable, Type } from '@angular/core';
import { ControlType, ControlTypes, FormConfig } from './core/base';
import { FormFieldConfig } from './core/field';
import { FormControlType } from './core/form-control-type';

@Injectable({
    providedIn: 'root',
})
export class NgxDynamicFormService {
    types = new Map<string, Type<FormControlType>>();

    constructor() {}

    addConfig(config: FormConfig): void {
        if (config.types) {
            config.types.forEach(type => this.setType(type));
        }
    }

    setType(ct: ControlType | ControlTypes): void {
        if (Array.isArray(ct)) {
            ct.forEach(t => this.setType(t));
        } else {
            this.types.set(ct.type, ct.component);
        }
    }

    getType(type: string): Type<FormControlType> | undefined {
        return this.types.get(type);
    }
}
