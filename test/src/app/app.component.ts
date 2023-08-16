import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentInit {
    constructor(private http: HttpClient) {}

    visible = false;
    dialogVisible = false;
    title?: string;

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngAfterContentInit(): void {}

    onLoading() {
        this.visible = true;

        setTimeout(() => {
            this.visible = false;
        }, 3000);
    }

    onDialog() {
        this.dialogVisible = true;
    }
}
