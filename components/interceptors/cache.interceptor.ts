import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
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
        if (cacheMap !== 'Storage') {
            return next.handle(request);
        }
        let key: string | null = this.getCodePointsFromString(request.url);
        if (request.method !== 'GET') {
            key = this.getCodePointsFromString(request.headers.get('Cache-Map-Key') ?? '');
            if (!key) {
                throw new Error('缓存post请求需要在header中传递Cache-Map-Key');
            }
        }
        const cachedResponse = this.cache.get(key);
        if (cachedResponse) {
            return cachedResponse as Observable<HttpEvent<T>>;
        }
        const response = next.handle(request).pipe(shareReplay(1));
        this.cache.set(key, response);
        return response;
    }

    private getCodePointsFromString(key: string) {
        const codePoints = [];
        for (let i = 0; i < key.length; i++) {
            codePoints.push(key.codePointAt(i));
        }
        return codePoints.join('');
    }
}

/**
 * 缓存请求拦截器注入内容
 */
export const NgxCacheInterceptorProvide = [{ provide: HTTP_INTERCEPTORS, useClass: NgxCacheInterceptor, multi: true }];
