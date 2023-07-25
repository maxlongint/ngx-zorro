import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, HostListener, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * 防抖的click事件注册
 * @example
 * <button nz-button (click.d)="onClick($event)">点击</button>
 */
class ClickDebounceDirective {
    constructor() {
        /**
         * 延迟时间(单位:ms)
         */
        this.delay = 500;
        this.disabled = false;
        /**
         * 防抖的click事件
         */
        this.clickEvent = new EventEmitter();
        this.click$ = new Subject();
        this.clickSubscription = this.click$.pipe(debounceTime(this.delay)).subscribe(event => {
            this.clickEvent.emit(event);
        });
    }
    ngOnDestroy() {
        var _a;
        (_a = this.clickSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    clickEventHandle(event) {
        if (this.disabled) {
            return;
        }
        this.click$.next(event);
    }
}
ClickDebounceDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ClickDebounceDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ClickDebounceDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.17", type: ClickDebounceDirective, selector: "[click.d]", inputs: { delay: "delay", disabled: "disabled" }, outputs: { clickEvent: "click.d" }, host: { listeners: { "click": "clickEventHandle($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ClickDebounceDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[click.d]',
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { delay: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clickEvent: [{
                type: Output,
                args: ['click.d']
            }], clickEventHandle: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

class NgxDirectivesModule {
}
NgxDirectivesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxDirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxDirectivesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxDirectivesModule, declarations: [ClickDebounceDirective], exports: [ClickDebounceDirective] });
NgxDirectivesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxDirectivesModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: NgxDirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ClickDebounceDirective],
                    exports: [ClickDebounceDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ClickDebounceDirective, NgxDirectivesModule };
//# sourceMappingURL=ngx-zorro-directives.js.map
