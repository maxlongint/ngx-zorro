import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingComponent } from './loading.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
    declarations: [NgxLoadingComponent],
    imports: [CommonModule, OverlayModule, PortalModule],
    exports: [NgxLoadingComponent],
})
export class NgxLoadingModule {}
