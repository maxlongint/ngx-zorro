import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDynamicFormComponent } from './dynamic-form.component';

@NgModule({
    declarations: [NgxDynamicFormComponent],
    imports: [CommonModule],
    exports: [NgxDynamicFormComponent],
})
export class NgxDynamicFormModule {
    static forRoot(config: Array<Record<string, any>> = []): ModuleWithProviders<NgxDynamicFormModule> {
        return {
            ngModule: NgxDynamicFormModule,
            providers: [],
        };
    }

    static forChild(config: Array<Record<string, any>> = []): ModuleWithProviders<NgxDynamicFormModule> {
        return {
            ngModule: NgxDynamicFormModule,
            providers: [],
        };
    }
}
