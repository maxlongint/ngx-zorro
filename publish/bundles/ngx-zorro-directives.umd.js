(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-zorro/directives', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global["ngx-zorro"] = global["ngx-zorro"] || {}, global["ngx-zorro"].directives = {}), global.ng.core, global.rxjs, global.rxjs.operators));
})(this, (function (exports, i0, rxjs, operators) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    /**
     * 防抖的click事件注册
     * @example
     * <button nz-button (click.d)="onClick($event)">点击</button>
     */
    var ClickDebounceDirective = /** @class */ (function () {
        function ClickDebounceDirective() {
            var _this = this;
            /**
             * 延迟时间(单位:ms)
             */
            this.delay = 500;
            this.disabled = false;
            /**
             * 防抖的click事件
             */
            this.clickEvent = new i0.EventEmitter();
            this.click$ = new rxjs.Subject();
            this.clickSubscription = this.click$.pipe(operators.debounceTime(this.delay)).subscribe(function (event) {
                _this.clickEvent.emit(event);
            });
        }
        ClickDebounceDirective.prototype.ngOnDestroy = function () {
            var _a;
            (_a = this.clickSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        ClickDebounceDirective.prototype.clickEventHandle = function (event) {
            if (this.disabled) {
                return;
            }
            this.click$.next(event);
        };
        return ClickDebounceDirective;
    }());
    ClickDebounceDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ClickDebounceDirective, deps: [], target: i0__namespace.ɵɵFactoryTarget.Directive });
    ClickDebounceDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.17", type: ClickDebounceDirective, selector: "[click.d]", inputs: { delay: "delay", disabled: "disabled" }, outputs: { clickEvent: "click.d" }, host: { listeners: { "click": "clickEventHandle($event)" } }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ClickDebounceDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[click.d]',
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { delay: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], clickEvent: [{
                    type: i0.Output,
                    args: ['click.d']
                }], clickEventHandle: [{
                    type: i0.HostListener,
                    args: ['click', ['$event']]
                }] } });

    var NgxDirectivesModule = /** @class */ (function () {
        function NgxDirectivesModule() {
        }
        return NgxDirectivesModule;
    }());
    NgxDirectivesModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxDirectivesModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    NgxDirectivesModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxDirectivesModule, declarations: [ClickDebounceDirective], exports: [ClickDebounceDirective] });
    NgxDirectivesModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxDirectivesModule });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxDirectivesModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [ClickDebounceDirective],
                        exports: [ClickDebounceDirective],
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ClickDebounceDirective = ClickDebounceDirective;
    exports.NgxDirectivesModule = NgxDirectivesModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-zorro-directives.umd.js.map
