import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-view-ref',
    templateUrl: './view-ref.component.html',
    styleUrls: ['./view-ref.component.scss'],
})
export class ViewRefComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        console.log('ViewRefComponent init');
    }
}
