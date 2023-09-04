import {
    ApplicationRef,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Inject,
    Injectable,
    Injector,
    ViewRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgxLoadingContainerComponent } from 'ngx-zorro/loading/loading-container.component';

@Injectable({
    providedIn: 'root',
})
export class NgxLoadingService {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        @Inject(DOCUMENT) private document: any,
        private injector: Injector,
    ) {}

    /**
     * 打开 Loading
     * @param tip 显示加载信息
     */
    open(tip?: string): NgxLoadingContainerComponent {
        const loadingRef: ComponentRef<NgxLoadingContainerComponent> = this.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(NgxLoadingContainerComponent),
        );
        if (tip) {
            loadingRef.instance.tip = tip;
        }
        loadingRef.instance.open();
        loadingRef.instance.close = () => {
            loadingRef.instance.visible = false;
            if (loadingRef) {
                loadingRef.destroy();
            }
        };
        return loadingRef.instance;
    }

    private createComponent<C>(componentFactory: ComponentFactory<C>) {
        const componentRef = componentFactory.create(this.injector) as ComponentRef<C>;
        this.appRef.attachView(componentRef.hostView);
        this.document.body.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);
        return componentRef;
    }
}
