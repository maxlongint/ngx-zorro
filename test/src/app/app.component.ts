import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentInit {
    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngAfterContentInit(): void {}

    change(event: Date) {
        console.dir(event);
    }
}
