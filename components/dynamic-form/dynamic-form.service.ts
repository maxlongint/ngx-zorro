import { Injectable, Type } from '@angular/core';
import { ControlType, ControlTypes, FormConfig } from './core/base';
import { FormControlType } from './core/form-control-type';

@Injectable({
    providedIn: 'root',
})
export class NgxDynamicFormService {
    types = new Map<string, Type<FormControlType>>();

    constructor() {}

    setType(ct: ControlType | ControlTypes) {
        if (Array.isArray(ct)) {
            ct.forEach(t => this.setType(t));
        } else {
            this.types.set(ct.type, ct.component);
        }
    }

    addConfig(config: FormConfig) {
        if (config.types) {
            config.types.forEach(type => this.setType(type));
        }
    }
}
