import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { NgxCacheService } from 'ngx-zorro/services';

@Injectable()
export class NgxCacheInterceptor implements HttpInterceptor {
    constructor(private cache: NgxCacheService) {}

    intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        // 1.判断是GET
        // 2.header中添加 Cache-Map: Storage
        const cacheMap = request.headers.get('Cache-Map');
        if (cacheMap !== 'Storage' || request.method !== 'GET') {
            return next.handle(request);
        }
        const cachedResponse = this.cache.get(request.url);
        if (cachedResponse) {
            return cachedResponse as Observable<HttpEvent<T>>;
        }
        const response = next.handle(request).pipe(shareReplay(1));
        this.cache.set(request.url, response);
        return response;
    }
}
