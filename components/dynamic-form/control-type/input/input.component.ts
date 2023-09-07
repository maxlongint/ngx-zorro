import { Component, OnInit } from '@angular/core';
import { FormControlType } from '../../core/form-control-type';

@Component({
    selector: 'ngx-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class NgxInputComponent extends FormControlType implements OnInit {
    ngOnInit(): void {}
}
