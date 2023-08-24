import { Directive, EmbeddedViewRef, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxConfigService } from 'ngx-zorro/services';
import { Subscription } from 'rxjs';

/**
 * 权限指令, 有权限渲染模板,否则渲染else模板
 * @example 1
 * <button *auth="['code1', 'code2']; else notAuth">有权限时显示</button>
 * <button *auth="'code1'; else notAuth">有权限时显示</button>
 * <ng-template #notAuth>没有权限时显示</ng-template>
 *
 * @example 2
 * <ng-container *auth="condition; then authTemplate; else noAuthTemplate"></ng-container>
 * <ng-template #authTemplate let-authList>有权限</ng-template>
 * <ng-template #noAuthTemplate>无权限</ng-template>
 */
@Directive({
    selector: '[auth]',
})
export class NgxAuthDirective implements OnDestroy {
    @Input() set auth(condition: string | string[]) {
        this.condition = condition;
        this.updateView();
    }

    @Input()
    set authThen(templateRef: TemplateRef<any> | null) {
        this.thenTemplateRef = templateRef;
        this.thenViewRef = null;
        this.updateView();
    }

    @Input()
    set authElse(templateRef: TemplateRef<any> | null) {
        this.elseTemplateRef = templateRef;
        this.elseViewRef = null;
        this.updateView();
    }

    constructor(
        private viewContainerRef: ViewContainerRef,
        public templateRef: TemplateRef<any>,
        private config: NgxConfigService
    ) {
        this.thenTemplateRef = templateRef;
    }

    ngOnDestroy(): void {
        this.authSubscription?.unsubscribe();
    }

    private condition: string | string[] = '';
    private thenTemplateRef: TemplateRef<any> | null = null;
    private elseTemplateRef: TemplateRef<any> | null = null;
    private thenViewRef: EmbeddedViewRef<any> | null = null;
    private elseViewRef: EmbeddedViewRef<any> | null = null;
    private authSubscription?: Subscription;

    private updateView() {
        if (!this.config.hasAuth) {
            throw '未实现 NgxZorroConfigService 的 hasAuth 方法';
        }
        this.authSubscription = this.config.hasAuth(this.condition).subscribe(context => {
            if (context.status) {
                if (!this.thenViewRef) {
                    this.viewContainerRef.clear();
                    this.elseViewRef = null;
                    if (this.thenTemplateRef) {
                        this.thenViewRef = this.viewContainerRef.createEmbeddedView(this.thenTemplateRef!, context);
                    }
                }
            } else {
                if (!this.elseViewRef) {
                    this.viewContainerRef.clear();
                    this.thenViewRef = null;
                    if (this.elseTemplateRef) {
                        this.elseViewRef = this.viewContainerRef.createEmbeddedView(this.elseTemplateRef!, context);
                    }
                }
            }
        });
    }
}
