/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Injector,
    Input,
    NgModuleFactory,
    NgModuleRef,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    StaticProvider,
    Type,
    ViewContainerRef,
} from '@angular/core';

/**
 * Instantiates a single {@link Component} type and inserts its Host View into current View.
 * `NgComponentOutlet` provides a declarative approach for dynamic component creation.
 *
 * `NgComponentOutlet` requires a component type, if a falsy value is set the view will clear and
 * any existing component will get destroyed.
 *
 * @usageNotes
 *
 * ### Fine tune control
 *
 * You can control the component creation process by using the following optional attributes:
 *
 * * `ngComponentOutletInjector`: Optional custom {@link Injector} that will be used as parent for
 * the Component. Defaults to the injector of the current view container.
 *
 * * `ngComponentOutletContent`: Optional list of projectable nodes to insert into the content
 * section of the component, if exists.
 *
 * * `ngComponentOutletNgModuleFactory`: Optional module factory to allow dynamically loading other
 * module, then load a component from that module.
 *
 * ### Syntax
 *
 * Simple
 * ```
 * <ng-container *ngxComponentOutlet="componentTypeExpression"></ng-container>
 * ```
 *
 * Customized injector/content
 * ```
 * <ng-container *ngxComponentOutlet="componentTypeExpression;
 *                                   injector: injectorExpression;
 *                                   content: contentNodesExpression;">
 * </ng-container>
 * ```
 *
 * Customized ngModuleFactory
 * ```
 * <ng-container *ngxComponentOutlet="componentTypeExpression;
 *                                   ngModuleFactory: moduleFactory;">
 * </ng-container>
 * ```
 *
 * ### A simple example
 *
 * {@example common/ngxComponentOutlet/ts/module.ts region='SimpleExample'}
 *
 * A more complete example with additional options:
 *
 * {@example common/ngxComponentOutlet/ts/module.ts region='CompleteExample'}
 *
 * @publicApi
 * @ngModule CommonModule
 */
@Directive({ selector: '[ngxComponentOutlet]' })
export class NgxComponentOutlet implements OnChanges, OnDestroy {
    @Input() ngxComponentOutlet?: Type<any>;

    @Input() ngxComponentOutletInjector!: Injector;

    @Input() ngxComponentOutletContent!: any[][];

    @Input() ngxComponentOutletInputs?: Record<string, any>;

    @Input() ngxComponentOutletNgModuleFactory!: NgModuleFactory<any>;

    private _componentRef: ComponentRef<any> | null = null;
    private _moduleRef: NgModuleRef<any> | null = null;

    constructor(private _viewContainerRef: ViewContainerRef) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.ngxComponentOutlet) {
            if (this.ngxComponentOutlet) {
                this._viewContainerRef.clear();
                this._componentRef = null;
                const elInjector = this.ngxComponentOutletInjector || this._viewContainerRef.parentInjector;

                if (changes['ngxComponentOutletNgModuleFactory']) {
                    if (this._moduleRef) this._moduleRef.destroy();

                    if (this.ngxComponentOutletNgModuleFactory) {
                        const parentModule = elInjector.get(NgModuleRef);
                        this._moduleRef = this.ngxComponentOutletNgModuleFactory.create(parentModule.injector);
                    } else {
                        this._moduleRef = null;
                    }
                }

                const componentFactoryResolver = this._moduleRef
                    ? this._moduleRef.componentFactoryResolver
                    : elInjector.get(ComponentFactoryResolver);

                const componentFactory = componentFactoryResolver.resolveComponentFactory(this.ngxComponentOutlet);

                this._componentRef = this._viewContainerRef.createComponent(
                    componentFactory,
                    this._viewContainerRef.length,
                    elInjector,
                    this.ngxComponentOutletContent,
                );

                this._componentRef.instance.content = this.ngxComponentOutletInputs;
            }
        }
        if (changes.ngxComponentOutletInputs) {
            this._componentRef!.instance.content = this.ngxComponentOutletInputs;
        }
    }

    ngOnDestroy() {
        if (this._moduleRef) this._moduleRef.destroy();
    }
}
