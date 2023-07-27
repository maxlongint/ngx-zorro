import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NgxConfigService {
    constructor() {}

    /**
     * 是否有权限
     * 返回值：Observable<{ $implicit: any; status: boolean }
     * $implicit是then和else模板的变量
     * status为是否存在权限
     */
    hasAuth?: (value: Array<string>) => Observable<{ $implicit: any; status: boolean }>;
}
