import { Injectable } from '@angular/core';
import { NgxConfigService } from 'ngx-zorro/services';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NgxZorroConfigService extends NgxConfigService {
    constructor() {
        super();
    }

    hasAuth = (tag: Array<string>) => {
        return of({ $implicit: { name: '删除' }, status: false });
    };
}
