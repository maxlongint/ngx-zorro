import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache: Map<string, HttpResponse<any>> = new Map<string, HttpResponse<any>>();

    constructor() {}

    intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        // 1.判断是GET
        // 2.header中添加 Cache-Map: Storage
        if (request.method !== 'GET') {
            return next.handle(request);
        }
        const cacheMap = request.headers.get('Cache-Map');
        if (cacheMap !== 'Storage') {
            return next.handle(request);
        }
        request = request.clone({
            headers: request.headers.delete('Cache-Map'),
        });
        const cachedResponse = this.cache.get(request.url);
        if (cachedResponse) {
            // 如果有缓存数据，则直接返回缓存响应
            return of(cachedResponse);
        }
        return next.handle(request).pipe(
            tap(response => {
                if (response instanceof HttpResponse) {
                    this.cache.set(request.url, response);
                }
            })
        );
    }
}
