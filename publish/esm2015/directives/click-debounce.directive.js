import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
/**
 * 防抖的click事件注册
 * @example
 * <button nz-button (click.d)="onClick($event)">点击</button>
 */
export class ClickDebounceDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stZGVib3VuY2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9kaXJlY3RpdmVzL2NsaWNrLWRlYm91bmNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRTlDOzs7O0dBSUc7QUFJSCxNQUFNLE9BQU8sc0JBQXNCO0lBYy9CO1FBYkE7O1dBRUc7UUFDTSxVQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ1osYUFBUSxHQUFHLEtBQUssQ0FBQztRQUMxQjs7V0FFRztRQUNnQixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztRQUUvRCxXQUFNLEdBQUcsSUFBSSxPQUFPLEVBQWMsQ0FBQztRQUkvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXOztRQUNQLE1BQUEsSUFBSSxDQUFDLGlCQUFpQiwwQ0FBRSxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBR0QsZ0JBQWdCLENBQUMsS0FBaUI7UUFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7b0hBOUJRLHNCQUFzQjt3R0FBdEIsc0JBQXNCOzRGQUF0QixzQkFBc0I7a0JBSGxDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7aUJBQ3hCOzBFQUtZLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUlhLFVBQVU7c0JBQTVCLE1BQU07dUJBQUMsU0FBUztnQkFnQmpCLGdCQUFnQjtzQkFEZixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuLyoqXHJcbiAqIOmYsuaKlueahGNsaWNr5LqL5Lu25rOo5YaMXHJcbiAqIEBleGFtcGxlXHJcbiAqIDxidXR0b24gbnotYnV0dG9uIChjbGljay5kKT1cIm9uQ2xpY2soJGV2ZW50KVwiPueCueWHuzwvYnV0dG9uPlxyXG4gKi9cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tjbGljay5kXScsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbGlja0RlYm91bmNlRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAgIC8qKlxyXG4gICAgICog5bu26L+f5pe26Ze0KOWNleS9jTptcylcclxuICAgICAqL1xyXG4gICAgQElucHV0KCkgZGVsYXkgPSA1MDA7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiDpmLLmipbnmoRjbGlja+S6i+S7tlxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCdjbGljay5kJykgY2xpY2tFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcclxuXHJcbiAgICBjbGljayQgPSBuZXcgU3ViamVjdDxNb3VzZUV2ZW50PigpO1xyXG4gICAgY2xpY2tTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja1N1YnNjcmlwdGlvbiA9IHRoaXMuY2xpY2skLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMuZGVsYXkpKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrRXZlbnQuZW1pdChldmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGlja1N1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgICBjbGlja0V2ZW50SGFuZGxlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsaWNrJC5uZXh0KGV2ZW50KTtcclxuICAgIH1cclxufVxyXG4iXX0=