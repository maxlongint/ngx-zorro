import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
    declarations: [LoadingComponent],
    imports: [CommonModule, OverlayModule, PortalModule],
    exports: [LoadingComponent],
})
export class NgxLoadingModule {}
