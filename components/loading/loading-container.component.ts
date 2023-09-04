import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-loading-container',
    template: `
        <ngx-loading [(visible)]="visible" [tip]="tip"></ngx-loading>
    `,
    preserveWhitespaces: false,
})
export class NgxLoadingContainerComponent implements OnInit {
    /**
     * 是否显示
     */
    @Input() visible = false;
    /**
     * 提示内容
     */
    @Input() tip = '加载中…';

    constructor() {}

    ngOnInit(): void {}

    open() {
        this.visible = true;
    }

    close(): void {}
}
