import { NgModule } from '@angular/core';
import { NgxClickDebounceDirective } from './click-debounce.directive';
import { NgxAuthDirective } from './auth.directive';

@NgModule({
    declarations: [NgxClickDebounceDirective, NgxAuthDirective],
    exports: [NgxClickDebounceDirective, NgxAuthDirective],
})
export class NgxDirectivesModule {}
