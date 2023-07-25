(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('rxjs/operators'), require('ng-zorro-antd/core/services')) :
  typeof define === 'function' && define.amd ? define('ngx-zorro/loading', ['exports', '@angular/core', '@angular/common', '@angular/cdk/overlay', '@angular/cdk/portal', 'rxjs/operators', 'ng-zorro-antd/core/services'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global["ngx-zorro"] = global["ngx-zorro"] || {}, global["ngx-zorro"].loading = {}), global.ng.core, global.ng.common, global.ng.cdk.overlay, global.ng.cdk.portal, global.rxjs.operators, global["ng-zorro-antd/core/services"]));
})(this, (function (exports, i0, common, i1, portal, operators, i2) { 'use strict';

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
  var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
  var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise, SuppressedError, Symbol */
  var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b)
              if (Object.prototype.hasOwnProperty.call(b, p))
                  d[p] = b[p]; };
      return extendStatics(d, b);
  };
  function __extends(d, b) {
      if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign = function () {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s)
                  if (Object.prototype.hasOwnProperty.call(s, p))
                      t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  function __rest(s, e) {
      var t = {};
      for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }
  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
      else
          for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                  r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  function __param(paramIndex, decorator) {
      return function (target, key) { decorator(target, key, paramIndex); };
  }
  function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
      function accept(f) { if (f !== void 0 && typeof f !== "function")
          throw new TypeError("Function expected"); return f; }
      var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
      var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
      var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
      var _, done = false;
      for (var i = decorators.length - 1; i >= 0; i--) {
          var context = {};
          for (var p in contextIn)
              context[p] = p === "access" ? {} : contextIn[p];
          for (var p in contextIn.access)
              context.access[p] = contextIn.access[p];
          context.addInitializer = function (f) { if (done)
              throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
          var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
          if (kind === "accessor") {
              if (result === void 0)
                  continue;
              if (result === null || typeof result !== "object")
                  throw new TypeError("Object expected");
              if (_ = accept(result.get))
                  descriptor.get = _;
              if (_ = accept(result.set))
                  descriptor.set = _;
              if (_ = accept(result.init))
                  initializers.unshift(_);
          }
          else if (_ = accept(result)) {
              if (kind === "field")
                  initializers.unshift(_);
              else
                  descriptor[key] = _;
          }
      }
      if (target)
          Object.defineProperty(target, contextIn.name, descriptor);
      done = true;
  }
  ;
  function __runInitializers(thisArg, initializers, value) {
      var useValue = arguments.length > 2;
      for (var i = 0; i < initializers.length; i++) {
          value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
      }
      return useValue ? value : void 0;
  }
  ;
  function __propKey(x) {
      return typeof x === "symbol" ? x : "".concat(x);
  }
  ;
  function __setFunctionName(f, name, prefix) {
      if (typeof name === "symbol")
          name = name.description ? "[".concat(name.description, "]") : "";
      return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
  }
  ;
  function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
  }
  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try {
              step(generator.next(value));
          }
          catch (e) {
              reject(e);
          } }
          function rejected(value) { try {
              step(generator["throw"](value));
          }
          catch (e) {
              reject(e);
          } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }
  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function () { if (t[0] & 1)
              throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f)
              throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
              try {
                  if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                      return t;
                  if (y = 0, t)
                      op = [op[0] & 2, t.value];
                  switch (op[0]) {
                      case 0:
                      case 1:
                          t = op;
                          break;
                      case 4:
                          _.label++;
                          return { value: op[1], done: false };
                      case 5:
                          _.label++;
                          y = op[1];
                          op = [0];
                          continue;
                      case 7:
                          op = _.ops.pop();
                          _.trys.pop();
                          continue;
                      default:
                          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                              _ = 0;
                              continue;
                          }
                          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                              _.label = op[1];
                              break;
                          }
                          if (op[0] === 6 && _.label < t[1]) {
                              _.label = t[1];
                              t = op;
                              break;
                          }
                          if (t && _.label < t[2]) {
                              _.label = t[2];
                              _.ops.push(op);
                              break;
                          }
                          if (t[2])
                              _.ops.pop();
                          _.trys.pop();
                          continue;
                  }
                  op = body.call(thisArg, _);
              }
              catch (e) {
                  op = [6, e];
                  y = 0;
              }
              finally {
                  f = t = 0;
              }
          if (op[0] & 5)
              throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
      }
  }
  var __createBinding = Object.create ? (function (o, m, k, k2) {
      if (k2 === undefined)
          k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function () { return m[k]; } };
      }
      Object.defineProperty(o, k2, desc);
  }) : (function (o, m, k, k2) {
      if (k2 === undefined)
          k2 = k;
      o[k2] = m[k];
  });
  function __exportStar(m, o) {
      for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
              __createBinding(o, m, p);
  }
  function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m)
          return m.call(o);
      if (o && typeof o.length === "number")
          return {
              next: function () {
                  if (o && i >= o.length)
                      o = void 0;
                  return { value: o && o[i++], done: !o };
              }
          };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
          return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
      }
      catch (error) {
          e = { error: error };
      }
      finally {
          try {
              if (r && !r.done && (m = i["return"]))
                  m.call(i);
          }
          finally {
              if (e)
                  throw e.error;
          }
      }
      return ar;
  }
  /** @deprecated */
  function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
      return ar;
  }
  /** @deprecated */
  function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  }
  function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
              if (ar || !(i in from)) {
                  if (!ar)
                      ar = Array.prototype.slice.call(from, 0, i);
                  ar[i] = from[i];
              }
          }
      return to.concat(ar || Array.prototype.slice.call(from));
  }
  function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
      function verb(n) { if (g[n])
          i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
      function resume(n, v) { try {
          step(g[n](v));
      }
      catch (e) {
          settle(q[0][3], e);
      } }
      function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
      function fulfill(value) { resume("next", value); }
      function reject(value) { resume("throw", value); }
      function settle(f, v) { if (f(v), q.shift(), q.length)
          resume(q[0][0], q[0][1]); }
  }
  function __asyncDelegator(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
      function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
  }
  function __asyncValues(o) {
      if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
      function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
      function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
  }
  function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
      }
      else {
          cooked.raw = raw;
      }
      return cooked;
  }
  ;
  var __setModuleDefault = Object.create ? (function (o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function (o, v) {
      o["default"] = v;
  };
  function __importStar(mod) {
      if (mod && mod.__esModule)
          return mod;
      var result = {};
      if (mod != null)
          for (var k in mod)
              if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                  __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  }
  function __importDefault(mod) {
      return (mod && mod.__esModule) ? mod : { default: mod };
  }
  function __classPrivateFieldGet(receiver, state, kind, f) {
      if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f) {
      if (kind === "m")
          throw new TypeError("Private method is not writable");
      if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
  }
  function __classPrivateFieldIn(state, receiver) {
      if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
          throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof state === "function" ? receiver === state : state.has(receiver);
  }
  function __addDisposableResource(env, value, async) {
      if (value !== null && value !== void 0) {
          if (typeof value !== "object")
              throw new TypeError("Object expected.");
          var dispose;
          if (async) {
              if (!Symbol.asyncDispose)
                  throw new TypeError("Symbol.asyncDispose is not defined.");
              dispose = value[Symbol.asyncDispose];
          }
          if (dispose === void 0) {
              if (!Symbol.dispose)
                  throw new TypeError("Symbol.dispose is not defined.");
              dispose = value[Symbol.dispose];
          }
          if (typeof dispose !== "function")
              throw new TypeError("Object not disposable.");
          env.stack.push({ value: value, dispose: dispose, async: async });
      }
      else if (async) {
          env.stack.push({ async: true });
      }
      return value;
  }
  var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  function __disposeResources(env) {
      function fail(e) {
          env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
          env.hasError = true;
      }
      function next() {
          while (env.stack.length) {
              var rec = env.stack.pop();
              try {
                  var result = rec.dispose && rec.dispose.call(rec.value);
                  if (rec.async)
                      return Promise.resolve(result).then(next, function (e) { fail(e); return next(); });
              }
              catch (e) {
                  fail(e);
              }
          }
          if (env.hasError)
              throw env.error;
      }
      return next();
  }
  var tslib_es6 = {
      __extends: __extends,
      __assign: __assign,
      __rest: __rest,
      __decorate: __decorate,
      __param: __param,
      __metadata: __metadata,
      __awaiter: __awaiter,
      __generator: __generator,
      __createBinding: __createBinding,
      __exportStar: __exportStar,
      __values: __values,
      __read: __read,
      __spread: __spread,
      __spreadArrays: __spreadArrays,
      __spreadArray: __spreadArray,
      __await: __await,
      __asyncGenerator: __asyncGenerator,
      __asyncDelegator: __asyncDelegator,
      __asyncValues: __asyncValues,
      __makeTemplateObject: __makeTemplateObject,
      __importStar: __importStar,
      __importDefault: __importDefault,
      __classPrivateFieldGet: __classPrivateFieldGet,
      __classPrivateFieldSet: __classPrivateFieldSet,
      __classPrivateFieldIn: __classPrivateFieldIn,
      __addDisposableResource: __addDisposableResource,
      __disposeResources: __disposeResources,
  };

  var LoadingComponent = /** @class */ (function () {
      function LoadingComponent(elementRef, overlay, viewContainerRef, destroy, renderer) {
          this.elementRef = elementRef;
          this.overlay = overlay;
          this.viewContainerRef = viewContainerRef;
          this.destroy = destroy;
          this.renderer = renderer;
          /**
           * 是否显示(支持双向绑定)
           */
          this.visible = false;
          this.visibleChange = new i0.EventEmitter();
          /**
           * 提示内容
           */
          this.tip = '加载中…';
          /**
           * 是否行内模式
           */
          this.inline = false;
      }
      LoadingComponent.prototype.ngOnInit = function () { };
      LoadingComponent.prototype.ngOnChanges = function (changes) {
          var visible = changes.visible;
          if (visible) {
              var value = changes.visible.currentValue;
              if (value) {
                  this.open();
              }
              else {
                  this.close();
              }
          }
      };
      LoadingComponent.prototype.ngOnDestroy = function () {
          this.disposeOverlay();
      };
      LoadingComponent.prototype.open = function () {
          this.attachOverlay();
          this.visible = true;
          this.visibleChange.emit(true);
          this.updateOverlayStyle();
          this.updateBodyOverflow();
      };
      LoadingComponent.prototype.close = function () {
          this.visible = false;
          this.visibleChange.emit(false);
          this.updateOverlayStyle();
          this.updateBodyOverflow();
          this.disposeOverlay();
      };
      LoadingComponent.prototype.attachOverlay = function () {
          var _this = this;
          this.templatePortal = new portal.TemplatePortal(this.loadingTemplate, this.viewContainerRef);
          this.overlayRef = this.overlay.create(this.getOverlayConfig());
          if (this.overlayRef && !this.overlayRef.hasAttached()) {
              this.overlayRef
                  .attachments()
                  .pipe(operators.takeUntil(this.destroy))
                  .subscribe(function () {
                  _this.notFullOverlay();
                  _this.parentResizeObserver();
              });
              this.overlayRef.attach(this.templatePortal);
          }
      };
      LoadingComponent.prototype.getOverlayConfig = function () {
          var positionStrategy = this.overlay.position().global();
          return new i1.OverlayConfig({
              positionStrategy: positionStrategy,
              hasBackdrop: false,
              disposeOnNavigation: true,
              width: '100vw',
              height: '100vh',
          });
      };
      LoadingComponent.prototype.disposeOverlay = function () {
          var _a, _b;
          (_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.dispose();
          this.overlayRef = null;
          (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
      };
      LoadingComponent.prototype.updateOverlayStyle = function () {
          if (this.overlayRef && this.overlayRef.overlayElement) {
              this.renderer.setStyle(this.overlayRef.overlayElement, 'pointer-events', this.visible ? 'auto' : 'none');
          }
      };
      LoadingComponent.prototype.updateBodyOverflow = function () {
          if (this.overlayRef) {
              if (this.visible) {
                  this.overlayRef.getConfig().scrollStrategy.enable();
              }
              else {
                  this.overlayRef.getConfig().scrollStrategy.disable();
              }
          }
      };
      LoadingComponent.prototype.notFullOverlay = function () {
          if (!this.inline) {
              return;
          }
          if (this.overlayRef) {
              var parentElement = this.elementRef.nativeElement.parentElement;
              if (!parentElement) {
                  return;
              }
              this.overlayRef.updateSize({
                  width: parentElement.clientWidth,
                  height: parentElement.clientHeight,
              });
              var positionStrategy = this.overlay
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
      };
      LoadingComponent.prototype.parentResizeObserver = function () {
          var _this = this;
          if (!this.inline) {
              return;
          }
          if (this.overlayRef) {
              var parentElement = this.elementRef.nativeElement.parentElement;
              if (!parentElement) {
                  return;
              }
              this.resizeObserver = new ResizeObserver(function (_c) {
                  var _d = __read(_c, 1), entry = _d[0];
                  // const { width, height } = entry.contentRect;
                  // 处理div大小变化的逻辑
                  _this.notFullOverlay();
              });
              // 开始监听父元素的大小变化
              this.resizeObserver.observe(parentElement);
          }
      };
      return LoadingComponent;
  }());
  LoadingComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: LoadingComponent, deps: [{ token: i0__namespace.ElementRef }, { token: i1__namespace.Overlay }, { token: i0__namespace.ViewContainerRef }, { token: i2__namespace.NzDestroyService }, { token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Component });
  LoadingComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: LoadingComponent, selector: "ngx-loading", inputs: { visible: "visible", tip: "tip", inline: "inline" }, outputs: { visibleChange: "visibleChange" }, providers: [i2.NzDestroyService], viewQueries: [{ propertyName: "loadingTemplate", first: true, predicate: ["loadingTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<ng-template #loadingTemplate>\r\n    <div class=\"loading-conent\">\r\n        <div class=\"loading-spinner\">\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n        </div>\r\n        <div class=\"loading-tip\">{{ tip }}</div>\r\n    </div>\r\n</ng-template>\r\n", styles: [".loading-conent{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden;-webkit-user-select:none;user-select:none;background-color:#00000073}.loading-tip{margin-top:16px;color:#fff;font-size:1rem;line-height:1.5rem}.loading-spinner{color:official;display:inline-block;position:relative;width:80px;height:80px}.loading-spinner div{transform-origin:40px 40px;animation:loading-spinner 1.2s linear infinite}.loading-spinner div:after{content:\" \";display:block;position:absolute;top:3px;left:37px;width:6px;height:18px;border-radius:20%;background:#fff}.loading-spinner div:nth-child(1){transform:rotate(0);animation-delay:-1.1s}.loading-spinner div:nth-child(2){transform:rotate(30deg);animation-delay:-1s}.loading-spinner div:nth-child(3){transform:rotate(60deg);animation-delay:-.9s}.loading-spinner div:nth-child(4){transform:rotate(90deg);animation-delay:-.8s}.loading-spinner div:nth-child(5){transform:rotate(120deg);animation-delay:-.7s}.loading-spinner div:nth-child(6){transform:rotate(150deg);animation-delay:-.6s}.loading-spinner div:nth-child(7){transform:rotate(180deg);animation-delay:-.5s}.loading-spinner div:nth-child(8){transform:rotate(210deg);animation-delay:-.4s}.loading-spinner div:nth-child(9){transform:rotate(240deg);animation-delay:-.3s}.loading-spinner div:nth-child(10){transform:rotate(270deg);animation-delay:-.2s}.loading-spinner div:nth-child(11){transform:rotate(300deg);animation-delay:-.1s}.loading-spinner div:nth-child(12){transform:rotate(330deg);animation-delay:0s}@keyframes loading-spinner{0%{opacity:1}to{opacity:0}}\n"] });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: LoadingComponent, decorators: [{
              type: i0.Component,
              args: [{
                      selector: 'ngx-loading',
                      templateUrl: './loading.component.html',
                      styleUrls: ['./loading.component.scss'],
                      providers: [i2.NzDestroyService],
                  }]
          }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i1__namespace.Overlay }, { type: i0__namespace.ViewContainerRef }, { type: i2__namespace.NzDestroyService }, { type: i0__namespace.Renderer2 }]; }, propDecorators: { visible: [{
                  type: i0.Input
              }], visibleChange: [{
                  type: i0.Output
              }], tip: [{
                  type: i0.Input
              }], inline: [{
                  type: i0.Input
              }], loadingTemplate: [{
                  type: i0.ViewChild,
                  args: ['loadingTemplate', { static: true }]
              }] } });

  var NgxLoadingModule = /** @class */ (function () {
      function NgxLoadingModule() {
      }
      return NgxLoadingModule;
  }());
  NgxLoadingModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxLoadingModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
  NgxLoadingModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxLoadingModule, declarations: [LoadingComponent], imports: [common.CommonModule, i1.OverlayModule, portal.PortalModule], exports: [LoadingComponent] });
  NgxLoadingModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxLoadingModule, imports: [[common.CommonModule, i1.OverlayModule, portal.PortalModule]] });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: NgxLoadingModule, decorators: [{
              type: i0.NgModule,
              args: [{
                      declarations: [LoadingComponent],
                      imports: [common.CommonModule, i1.OverlayModule, portal.PortalModule],
                      exports: [LoadingComponent],
                  }]
          }] });

  /**
   * Generated bundle index. Do not edit.
   */

  exports.LoadingComponent = LoadingComponent;
  exports.NgxLoadingModule = NgxLoadingModule;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-zorro-loading.umd.js.map
