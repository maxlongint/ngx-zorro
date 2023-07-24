import {
    Directive,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * 防抖的click事件注册
 * @example
 * <button nz-button (click.d)="onClick($event)">点击</button>
 */
@Directive({
    selector: '[click.d]',
})
export class ClickDebounceDirective implements OnDestroy {
    /**
     * 延迟时间(单位:ms)
     */
    @Input() delay = 500;
    @Input() disabled = false;
    /**
     * 防抖的click事件
     */
    @Output('click.d') clickEvent = new EventEmitter<MouseEvent>();

    click$ = new Subject<MouseEvent>();
    clickSubscription?: Subscription;

    constructor() {
        this.clickSubscription = this.click$
            .pipe(debounceTime(this.delay))
            .subscribe((event) => {
                this.clickEvent.emit(event);
            });
    }

    ngOnDestroy(): void {
        this.clickSubscription?.unsubscribe();
    }

    @HostListener('click', ['$event'])
    clickEventHandle(event: MouseEvent): void {
        if (this.disabled) {
            return;
        }
        this.click$.next(event);
    }
}
