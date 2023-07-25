import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal, PortalModule } from '@angular/cdk/portal';
import { takeUntil } from 'rxjs/operators';
import * as i2 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';

class LoadingComponent {
    constructor(elementRef, overlay, viewContainerRef, destroy, renderer) {
        this.elementRef = elementRef;
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.destroy = destroy;
        this.renderer = renderer;
        /**
         * 是否显示(支持双向绑定)
         */
        this.visible = false;
        this.visibleChange = new EventEmitter();
        /**
         * 提示内容
         */
        this.tip = '加载中…';
        /**
         * 是否行内模式
         */
        this.inline = false;
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        const { visible } = changes;
        if (visible) {
            const value = changes.visible.currentValue;
            if (value) {
                this.open();
            }
            else {
                this.close();
            }
        }
    }
    ngOnDestroy() {
        this.disposeOverlay();
    }
    open() {
        this.attachOverlay();
        this.visible = true;
        this.visibleChange.emit(true);
        this.updateOverlayStyle();
        this.updateBodyOverflow();
    }
    close() {
        this.visible = false;
        this.visibleChange.emit(false);
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.disposeOverlay();
    }
    attachOverlay() {
        this.templatePortal = new TemplatePortal(this.loadingTemplate, this.viewContainerRef);
        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef
                .attachments()
                .pipe(takeUntil(this.destroy))
                .subscribe(() => {
                this.notFullOverlay();
                this.parentResizeObserver();
            });
            this.overlayRef.attach(this.templatePortal);
        }
    }
    getOverlayConfig() {
        const positionStrategy = this.overlay.position().global();
        return new OverlayConfig({
            positionStrategy,
            hasBackdrop: false,
            disposeOnNavigation: true,
            width: '100vw',
            height: '100vh',
        });
    }
    disposeOverlay() {
        var _a, _b;
        (_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.dispose();
        this.overlayRef = null;
        (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
    }
    updateOverlayStyle() {
        if (this.overlayRef && this.overlayRef.overlayElement) {
            this.renderer.setStyle(this.overlayRef.overlayElement, 'pointer-events', this.visible ? 'auto' : 'none');
        }
    }
    updateBodyOverflow() {
        if (this.overlayRef) {
            if (this.visible) {
                this.overlayRef.getConfig().scrollStrategy.enable();
            }
            else {
                this.overlayRef.getConfig().scrollStrategy.disable();
            }
        }
    }
    notFullOverlay() {
        if (!this.inline) {
            return;
        }
        if (this.overlayRef) {
            const parentElement = this.elementRef.nativeElement.parentElement;
            if (!parentElement) {
                return;
            }
            this.overlayRef.updateSize({
                width: parentElement.clientWidth,
                height: parentElement.clientHeight,
            });
            const positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(parentElement)
                .withPositions([
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetX: 0,
                    offsetY: 0,
                },
            ]);
            this.overlayRef.updatePositionStrategy(positionStrategy);
        }
    }
    parentResizeObserver() {
        if (!this.inline) {
            return;
        }
        if (this.overlayRef) {
            const parentElement = this.elementRef.nativeElement.parentElement;
            if (!parentElement) {
                return;
            }
            this.resizeObserver = new ResizeObserver(([entry]) => {
                // const { width, height } = entry.contentRect;
                // 处理div大小变化的逻辑
                this.notFullOverlay();
            });
            // 开始监听父元素的大小变化
            this.resizeObserver.observe(parentElement);
        }
    }
}
LoadingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: LoadingComponent, deps: [{ token: i0.ElementRef }, { token: i1.Overlay }, { token: i0.ViewContainerRef }, { token: i2.NzDestroyService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
LoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: LoadingComponent, selector: "ngx-loading", inputs: { visible: "visible", tip: "tip", inline: "inline" }, outputs: { visibleChange: "visibleChange" }, providers: [NzDestroyService], viewQueries: [{ propertyName: "loadingTemplate", first: true, predicate: ["loadingTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<ng-template #loadingTemplate>\r\n    <div class=\"loading-conent\">\r\n        <div class=\"loading-spinner\">\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n        </div>\r\n        <div class=\"loading-tip\">{{ tip }}</div>\r\n    </div>\r\n</ng-template>\r\n", styles: [".loading-conent{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden;-webkit-user-select:none;user-select:none;background-color:#00000073}.loading-tip{margin-top:16px;color:#fff;font-size:1rem;line-height:1.5rem}.loading-spinner{color:official;display:inline-block;position:relative;width:80px;height:80px}.loading-spinner div{transform-origin:40px 40px;animation:loading-spinner 1.2s linear infinite}.loading-spinner div:after{content:\" \";display:block;position:absolute;top:3px;left:37px;width:6px;height:18px;border-radius:20%;background:#fff}.loading-spinner div:nth-child(1){transform:rotate(0);animation-delay:-1.1s}.loading-spinner div:nth-child(2){transform:rotate(30deg);animation-delay:-1s}.loading-spinner div:nth-child(3){transform:rotate(60deg);animation-delay:-.9s}.loading-spinner div:nth-child(4){transform:rotate(90deg);animation-delay:-.8s}.loading-spinner div:nth-child(5){transform:rotate(120deg);animation-delay:-.7s}.loading-spinner div:nth-child(6){transform:rotate(150deg);animation-delay:-.6s}.loading-spinner div:nth-child(7){transform:rotate(180deg);animation-delay:-.5s}.loading-spinner div:nth-child(8){transform:rotate(210deg);animation-delay:-.4s}.loading-spinner div:nth-child(9){transform:rotate(240deg);animation-delay:-.3s}.loading-spinner div:nth-child(10){transform:rotate(270deg);animation-delay:-.2s}.loading-spinner div:nth-child(11){transform:rotate(300deg);animation-delay:-.1s}.loading-spinner div:nth-child(12){transform:rotate(330deg);animation-delay:0s}@keyframes loading-spinner{0%{opacity:1}to{opacity:0}}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-loading',
                    templateUrl: './loading.component.html',
                    styleUrls: ['./loading.component.scss'],
                    providers: [NzDestroyService],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Overlay }, { type: i0.ViewContainerRef }, { type: i2.NzDestroyService }, { type: i0.Renderer2 }]; }, propDecorators: { visible: [{
                type: Input
            }], visibleChange: [{
                type: Output
            }], tip: [{
                type: Input
            }], inline: [{
                type: Input
            }], loadingTemplate: [{
                type: ViewChild,
                args: ['loadingTemplate', { static: true }]
            }] } });

class NgxLoadingModule {
}
NgxLoadingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxLoadingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxLoadingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxLoadingModule, declarations: [LoadingComponent], imports: [CommonModule, OverlayModule, PortalModule], exports: [LoadingComponent] });
NgxLoadingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxLoadingModule, imports: [[CommonModule, OverlayModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxLoadingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [LoadingComponent],
                    imports: [CommonModule, OverlayModule, PortalModule],
                    exports: [LoadingComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { LoadingComponent, NgxLoadingModule };
//# sourceMappingURL=ngx-zorro-loading.js.map
