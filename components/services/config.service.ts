import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NgxConfigService {
    constructor() {}

    /**
     * 是否有权限
     */
    hasAuth?: (value: Array<string>) => Observable<{ $implicit: any; status: boolean }>;
}
