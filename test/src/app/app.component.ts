import { Component, TemplateRef, ViewChild, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IFormItem, FormItemType } from 'ngx-zorro/core/tree';
import { NgxDynamicFormComponent } from 'ngx-zorro/dynamic-form';
import { DownFileService, Store, setStorePrefix } from 'ngx-zorro/utils';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentInit {
    @Store()
    visible = false;
    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngAfterContentInit(): void {}
}
