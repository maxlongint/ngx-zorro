import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDynamicFormComponent } from './dynamic-form.component';
import { FORM_CONFIG, FormConfig } from './core/base';
import { NgxDynamicFormService } from './dynamic-form.service';

export function defaultConfig(): FormConfig {
    return {
        types: [],
    };
}

@NgModule({
    declarations: [NgxDynamicFormComponent],
    imports: [CommonModule],
    exports: [NgxDynamicFormComponent],
})
export class NgxDynamicFormModule {
    constructor(
        @Optional() @Inject(FORM_CONFIG) configs: FormConfig[],
        private service: NgxDynamicFormService,
    ) {
        if (configs) {
            configs.filter(c => c).forEach(config => this.service.addConfig(config));
        }
    }

    static forRoot(config?: FormConfig): ModuleWithProviders<NgxDynamicFormModule> {
        return {
            ngModule: NgxDynamicFormModule,
            providers: [
                { provide: FORM_CONFIG, useFactory: defaultConfig, multi: true },
                { provide: FORM_CONFIG, useValue: config, multi: true },
            ],
        };
    }
}
