import { Component, OnInit } from '@angular/core';
import { NgxDynamicFormService } from 'ngx-zorro/dynamic-form/dynamic-form.service';

@Component({
    selector: 'ngx-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
})
export class NgxDynamicFormComponent implements OnInit {
    constructor(private service: NgxDynamicFormService) {}

    ngOnInit(): void {}
}
