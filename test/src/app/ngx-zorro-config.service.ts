import { Injectable } from '@angular/core';
import { NgxConfigService } from 'ngx-zorro/services';
import { of } from 'rxjs';
import { environment } from '../environments/environment';
import { Store } from 'ngx-zorro/utils';

@Injectable({
    providedIn: 'root',
})
export class NgxZorroConfigService extends NgxConfigService {
    @Store()
    userInfo = {};

    constructor() {
        super();
    }

    hasAuth = (tag: Array<string>) => {
        return of({ $implicit: { name: '删除' }, status: false });
    };
}
