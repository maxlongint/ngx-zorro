import { Overlay } from '@angular/cdk/overlay';
import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import * as i0 from "@angular/core";
export declare class LoadingComponent implements OnInit, OnChanges, OnDestroy {
    private elementRef;
    private overlay;
    private viewContainerRef;
    private destroy;
    private renderer;
    /**
     * 是否显示(支持双向绑定)
     */
    visible: boolean;
    visibleChange: EventEmitter<boolean>;
    /**
     * 提示内容
     */
    tip: string;
    /**
     * 是否行内模式
     */
    inline: boolean;
    constructor(elementRef: ElementRef, overlay: Overlay, viewContainerRef: ViewContainerRef, destroy: NzDestroyService, renderer: Renderer2);
    loadingTemplate: TemplateRef<ElementRef>;
    /**
     * 浮层对象
     */
    private overlayRef?;
    /**
     * 渲染模板
     */
    private templatePortal?;
    /**
     * 父元素大小改变监听对象
     */
    private resizeObserver?;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    open(): void;
    close(): void;
    private attachOverlay;
    private getOverlayConfig;
    private disposeOverlay;
    private updateOverlayStyle;
    private updateBodyOverflow;
    private notFullOverlay;
    private parentResizeObserver;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingComponent, "ngx-loading", never, { "visible": "visible"; "tip": "tip"; "inline": "inline"; }, { "visibleChange": "visibleChange"; }, never, never>;
}
