import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDialogComponent } from './dialog.component';
import { NgxDialogDirective } from './dialog.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
    declarations: [NgxDialogComponent, NgxDialogDirective],
    imports: [CommonModule, OverlayModule, PortalModule, DragDropModule, NzIconModule, PlatformModule, NzOutletModule],
    exports: [NgxDialogComponent, NgxDialogDirective],
})
export class NgxDialogModule {}
