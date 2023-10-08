import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class NgxCacheService {
    private cache: Map<string, Observable<HttpEvent<any>>> = new Map<string, Observable<HttpEvent<any>>>();

    get<T>(url: string): Observable<HttpEvent<T>> | undefined {
        return this.cache.get(url) as Observable<HttpEvent<T>>;
    }

    set<T>(url: string, response: Observable<HttpEvent<T>>) {
        this.cache.set(url, response);
    }

    delete(url: string): void {
        this.cache.delete(url);
    }

    clear(): void {
        this.cache.clear();
    }
}

/**
 * 设置为缓存请求；使用方法：this.http.get(...CacheTemplate`api/response.json`).subscribe(res => {});
 * @param urls 请求地址
 * @param params 模板参数
 */
export function CacheTemplate(urls: TemplateStringsArray, ...params: any[]): [string, { headers: HttpHeaders }] {
    let [url] = urls;
    if (params.length > 0) {
        url = String.raw(urls, ...params);
    }
    return [url, { headers: new HttpHeaders({ 'Cache-Map': 'Storage' }) }];
}
