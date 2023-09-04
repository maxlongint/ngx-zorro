import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingComponent } from './loading.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgxLoadingContainerComponent } from './loading-container.component';

@NgModule({
    declarations: [NgxLoadingComponent, NgxLoadingContainerComponent],
    imports: [CommonModule, OverlayModule, PortalModule],
    exports: [NgxLoadingComponent, NgxLoadingContainerComponent],
})
export class NgxLoadingModule {}
