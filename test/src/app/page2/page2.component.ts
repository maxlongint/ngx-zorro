import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { CacheTemplate, NgxCacheService } from 'ngx-zorro/services/cache.service';

@Component({
    selector: 'app-page2',
    templateUrl: './page2.component.html',
    styleUrls: ['./page2.component.scss'],
})
export class Page2Component implements OnInit {
    constructor(
        private http: HttpClient,
        private cache: NgxCacheService,
    ) {}

    ngOnInit(): void {}

    request() {
        const url = `assets/response.json`;
        const a = 1,
            b = 2;
        this.http.get(...CacheTemplate`${url}?a=${a}&b=${b}`).subscribe(result => {
            console.log(result);
        });
    }

    clear() {
        this.cache.clear();
    }
}
