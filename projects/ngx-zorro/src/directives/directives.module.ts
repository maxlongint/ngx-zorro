import { NgModule } from '@angular/core';
import { ClickDebounceDirective } from './click-debounce.directive';

@NgModule({
    declarations: [ClickDebounceDirective],
    exports: [ClickDebounceDirective],
})
export class NgxDirectivesModule {}
