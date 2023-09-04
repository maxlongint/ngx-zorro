import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { NgxLoadingService } from 'ngx-zorro/loading/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentInit {
    constructor(
        private http: HttpClient,
        private loading: NgxLoadingService,
    ) {}

    visible = false;
    dialogVisible = false;
    title?: string;

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngAfterContentInit(): void {}

    onLoading() {
        const loading = this.loading.open();

        setTimeout(() => {
            loading.close();
        }, 3000);
    }

    onDialog() {
        this.dialogVisible = true;
    }
}
