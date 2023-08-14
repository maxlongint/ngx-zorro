import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache: Map<string, Observable<HttpEvent<any>>> = new Map<string, Observable<HttpEvent<any>>>();

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
