import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

export type Method = 'get' | 'post';

/**
 * 下载文件服务
 * 例子
 * this.downFile.download().subscribe({
 *      next: () => {
 *          console.log('下载成功');
 *      },
 *      error: json => {
 *          console.log('错误提示');
 *      },
 * });
 */
@Injectable({
    providedIn: 'root',
})
export class NgxDownFileService {
    constructor(private http: HttpClient) {}

    /**
     * 下载文件
     * @param method 请求类型
     * @param url 请求链接; url可以传递自定义文件名优先级最高;如：api/file/down?fileName=身份证.jpg
     * @param params 请求参数
     */
    download(method: Method, url: string): Observable<HttpResponse<Blob>>;
    download(method: Method, url: string, params: Record<string, any>): Observable<HttpResponse<Blob>>;
    download(method: Method, url: string, params?: Record<string, any>): Observable<HttpResponse<Blob>> {
        let request = this.http.get(url, { params, responseType: 'blob', observe: 'response' }).pipe(
            tap((response: HttpResponse<Blob>) => {
                const filename = this.getFileName(response.headers, url);
                this.saveAs(response.body!, filename);
            }),
        );
        if (method === 'post') {
            request = this.http.post(url, params, { responseType: 'blob', observe: 'response' }).pipe(
                tap((response: HttpResponse<Blob>) => {
                    const filename = this.getFileName(response.headers, url);
                    this.saveAs(response.body!, filename);
                }),
            );
        }
        return request;
    }

    private getFileName(headers: HttpHeaders, url: string): string {
        // fileName的优先级
        // 优先级1. api/file/down?fileName=身份证.jpg; URL参数fileName
        // 优先级2. content-disposition;请求响应头的header中包含filename;
        // 优先级3. api/file/123.jpg; URL的最后一部分
        const fileNameAndQuery = url.split('?')[1];
        if (fileNameAndQuery) {
            const fileNameMatch = fileNameAndQuery.match(/fileName=([^&]*)/);
            if (fileNameMatch && fileNameMatch.length > 1) {
                return decodeURIComponent(fileNameMatch[1]);
            }
        }
        const disposition = headers.get('content-disposition');
        const filename = headers.get('filename');
        if (filename) {
            return decodeURIComponent(filename);
        }
        if (disposition) {
            const result = disposition.match(/filename=([^;]+)/);
            if (result && result.length > 1) {
                const fsn = result[1].replace(/(^")|("$)/g, '');
                return decodeURIComponent(fsn);
            }
        }
        const start = url.lastIndexOf('/') + 1;
        const endIndex = url.lastIndexOf('?');
        const end = endIndex === -1 ? url.length : endIndex;
        return url.substring(start, end);
    }

    /**
     * 文件另存为
     * @param body 二进制内容
     * @param filename 文件名
     */
    private saveAs(body: Blob, filename: string) {
        const blob = new Blob([body], { type: 'application/x-msdownload' });
        const blobURL = URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        URL.revokeObjectURL(blobURL);
    }
}
