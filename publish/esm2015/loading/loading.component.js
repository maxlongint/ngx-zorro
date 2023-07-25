import { OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "ng-zorro-antd/core/services";
export class LoadingComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi9jb21wb25lbnRzL2xvYWRpbmcvbG9hZGluZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVcsYUFBYSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFDSCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBSU4sU0FBUyxHQUVaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7OztBQVEvRCxNQUFNLE9BQU8sZ0JBQWdCO0lBZXpCLFlBQ1ksVUFBc0IsRUFDdEIsT0FBZ0IsRUFDaEIsZ0JBQWtDLEVBQ2xDLE9BQXlCLEVBQ3pCLFFBQW1CO1FBSm5CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFuQi9COztXQUVHO1FBQ00sWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNmLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0RDs7V0FFRztRQUNNLFFBQUcsR0FBRyxNQUFNLENBQUM7UUFDdEI7O1dBRUc7UUFDTSxXQUFNLEdBQUcsS0FBSyxDQUFDO0lBUXJCLENBQUM7SUFnQkosUUFBUSxLQUFVLENBQUM7SUFFbkIsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLE1BQU0sRUFBRSxP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b0JBQW9CO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztZQUNsRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNoQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO2dCQUNqRCwrQ0FBK0M7Z0JBQy9DLGVBQWU7Z0JBQ2YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsZUFBZTtZQUNmLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQzs7OEdBdktRLGdCQUFnQjtrR0FBaEIsZ0JBQWdCLGlKQUZkLENBQUMsZ0JBQWdCLENBQUMsaUxDeEJqQyxpaUJBbUJBOzRGRE9hLGdCQUFnQjtrQkFONUIsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsV0FBVyxFQUFFLDBCQUEwQjtvQkFDdkMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7b0JBQ3ZDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUNoQzs2TUFLWSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0ksYUFBYTtzQkFBdEIsTUFBTTtnQkFJRSxHQUFHO3NCQUFYLEtBQUs7Z0JBSUcsTUFBTTtzQkFBZCxLQUFLO2dCQVUwQyxlQUFlO3NCQUE5RCxTQUFTO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkNoYW5nZXMsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBSZW5kZXJlcjIsXHJcbiAgICBTaW1wbGVDaGFuZ2VzLFxyXG4gICAgVGVtcGxhdGVSZWYsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE56RGVzdHJveVNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvc2VydmljZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1sb2FkaW5nJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9sb2FkaW5nLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2xvYWRpbmcuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIHByb3ZpZGVyczogW056RGVzdHJveVNlcnZpY2VdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9hZGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbmmL7npLoo5pSv5oyB5Y+M5ZCR57uR5a6aKVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSB2aXNpYmxlID0gZmFsc2U7XHJcbiAgICBAT3V0cHV0KCkgdmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICAgIC8qKlxyXG4gICAgICog5o+Q56S65YaF5a65XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHRpcCA9ICfliqDovb3kuK3igKYnO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbooYzlhoXmqKHlvI9cclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgaW5saW5lID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcclxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBkZXN0cm95OiBOekRlc3Ryb3lTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICAgKSB7fVxyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2xvYWRpbmdUZW1wbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIGxvYWRpbmdUZW1wbGF0ZSE6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xyXG4gICAgLyoqXHJcbiAgICAgKiDmta7lsYLlr7nosaFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvdmVybGF5UmVmPzogT3ZlcmxheVJlZiB8IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+aooeadv1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRlbXBsYXRlUG9ydGFsPzogVGVtcGxhdGVQb3J0YWw7XHJcbiAgICAvKipcclxuICAgICAqIOeItuWFg+e0oOWkp+Wwj+aUueWPmOebkeWQrOWvueixoVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2l6ZU9ic2VydmVyPzogUmVzaXplT2JzZXJ2ZXI7XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7fVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB7IHZpc2libGUgfSA9IGNoYW5nZXM7XHJcbiAgICAgICAgaWYgKHZpc2libGUpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjaGFuZ2VzLnZpc2libGUuY3VycmVudFZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzcG9zZU92ZXJsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKCkge1xyXG4gICAgICAgIHRoaXMuYXR0YWNoT3ZlcmxheSgpO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVPdmVybGF5U3R5bGUoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUJvZHlPdmVyZmxvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU92ZXJsYXlTdHlsZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQm9keU92ZXJmbG93KCk7XHJcbiAgICAgICAgdGhpcy5kaXNwb3NlT3ZlcmxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXR0YWNoT3ZlcmxheSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlUG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMubG9hZGluZ1RlbXBsYXRlLCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUodGhpcy5nZXRPdmVybGF5Q29uZmlnKCkpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmICF0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWZcclxuICAgICAgICAgICAgICAgIC5hdHRhY2htZW50cygpXHJcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95KSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90RnVsbE92ZXJsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudFJlc2l6ZU9ic2VydmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLnRlbXBsYXRlUG9ydGFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPdmVybGF5Q29uZmlnKCk6IE92ZXJsYXlDb25maWcge1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKTtcclxuICAgICAgICByZXR1cm4gbmV3IE92ZXJsYXlDb25maWcoe1xyXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5LFxyXG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc3Bvc2VPbk5hdmlnYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwdncnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDB2aCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkaXNwb3NlT3ZlcmxheSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm92ZXJsYXlSZWY/LmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU92ZXJsYXlTdHlsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCwgJ3BvaW50ZXItZXZlbnRzJywgdGhpcy52aXNpYmxlID8gJ2F1dG8nIDogJ25vbmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVCb2R5T3ZlcmZsb3coKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkuc2Nyb2xsU3RyYXRlZ3khLmVuYWJsZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLnNjcm9sbFN0cmF0ZWd5IS5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBub3RGdWxsT3ZlcmxheSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKCFwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVNpemUoe1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHBhcmVudEVsZW1lbnQuY2xpZW50V2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHBhcmVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheVxyXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKClcclxuICAgICAgICAgICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHBhcmVudEVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAud2l0aFBvc2l0aW9ucyhbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WTogMCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvblN0cmF0ZWd5KHBvc2l0aW9uU3RyYXRlZ3kpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhcmVudFJlc2l6ZU9ic2VydmVyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAoIXBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChbZW50cnldKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGVudHJ5LmNvbnRlbnRSZWN0O1xyXG4gICAgICAgICAgICAgICAgLy8g5aSE55CGZGl25aSn5bCP5Y+Y5YyW55qE6YC76L6RXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdEZ1bGxPdmVybGF5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyDlvIDlp4vnm5HlkKzniLblhYPntKDnmoTlpKflsI/lj5jljJZcclxuICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCI8bmctdGVtcGxhdGUgI2xvYWRpbmdUZW1wbGF0ZT5cclxuICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLWNvbmVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLXNwaW5uZXJcIj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibG9hZGluZy10aXBcIj57eyB0aXAgfX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=