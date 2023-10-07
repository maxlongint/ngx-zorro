import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpEventType,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class NgxBlobInterceptor implements HttpInterceptor {
    intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        if (request.responseType !== 'blob') {
            return next.handle(request);
        }
        return next.handle(request).pipe(
            switchMap((response: HttpEvent<any>) => {
                return new Observable<HttpEvent<any>>(subscriber => {
                    if (response.type !== HttpEventType.Response) {
                        subscriber.next(response);
                        return;
                    }
                    if (response instanceof HttpResponse) {
                        if (response.body && response.body.type === 'application/json') {
                            this.blobToJson<T>(response.body, subscriber);
                            return;
                        }
                    }
                    subscriber.next(response);
                    subscriber.complete();
                });
            }),
            catchError((response: HttpErrorResponse) => {
                return new Observable<HttpEvent<any>>(subscriber => {
                    if (response.error) {
                        this.blobToJson<T>(response.error, subscriber);
                        return;
                    }
                    subscriber.error(response);
                    subscriber.complete();
                });
            }),
        );
    }

    private blobToJson<T>(blob: Blob, subscriber: Subscriber<HttpEvent<T>>) {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            const json: T = JSON.parse(<any>reader.result);
            subscriber.error(json);
            subscriber.complete();
        });
        reader.readAsText(blob, 'utf-8');
    }
}
