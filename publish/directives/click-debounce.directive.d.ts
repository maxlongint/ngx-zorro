import { EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * 防抖的click事件注册
 * @example
 * <button nz-button (click.d)="onClick($event)">点击</button>
 */
export declare class ClickDebounceDirective implements OnDestroy {
    /**
     * 延迟时间(单位:ms)
     */
    delay: number;
    disabled: boolean;
    /**
     * 防抖的click事件
     */
    clickEvent: EventEmitter<MouseEvent>;
    click$: Subject<MouseEvent>;
    clickSubscription?: Subscription;
    constructor();
    ngOnDestroy(): void;
    clickEventHandle(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickDebounceDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClickDebounceDirective, "[click.d]", never, { "delay": "delay"; "disabled": "disabled"; }, { "clickEvent": "click.d"; }, never>;
}
