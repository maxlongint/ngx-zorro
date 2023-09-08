import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDynamicFormComponent } from './dynamic-form.component';
import { FORM_CONFIG, FormConfig } from './core/base';
import { NgxDynamicFormService } from './dynamic-form.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxControlTypeModule } from './control-type/control-type.module';
import { NgxInputComponent } from './control-type/input.component';

export function defaultConfig(): FormConfig {
    return {
        types: [{ type: 'input', component: NgxInputComponent }],
    };
}

@NgModule({
    declarations: [NgxDynamicFormComponent],
    imports: [CommonModule, NgxControlTypeModule, ReactiveFormsModule, NzFormModule],
    exports: [NgxDynamicFormComponent],
})
export class NgxDynamicFormModule {
    static rootConfig?: FormConfig;

    constructor(
        @Optional() @Inject(FORM_CONFIG) configs: FormConfig[],
        private service: NgxDynamicFormService,
    ) {
        if (configs) {
            configs.forEach(config => config && this.service.addConfig(config));
        }
    }

    static forRoot(config?: FormConfig): ModuleWithProviders<NgxDynamicFormModule> {
        this.rootConfig = config;
        return {
            ngModule: NgxDynamicFormModule,
            providers: [
                { provide: FORM_CONFIG, useFactory: defaultConfig, multi: true },
                { provide: FORM_CONFIG, useValue: config, multi: true },
            ],
        };
    }

    static forChild(config?: FormConfig): ModuleWithProviders<NgxDynamicFormModule> {
        return {
            ngModule: NgxDynamicFormModule,
            providers: [
                { provide: FORM_CONFIG, useFactory: defaultConfig, multi: true },
                { provide: FORM_CONFIG, useValue: this.rootConfig, multi: true },
                { provide: FORM_CONFIG, useValue: config, multi: true },
                NgxDynamicFormService,
            ],
        };
    }
}
