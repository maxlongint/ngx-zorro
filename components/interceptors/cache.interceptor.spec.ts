import { TestBed } from '@angular/core/testing';

import { NgxCacheInterceptor } from './cache.interceptor';

describe('NgxCacheInterceptor', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [NgxCacheInterceptor],
        }),
    );

    it('should be created', () => {
        const interceptor: NgxCacheInterceptor = TestBed.inject(NgxCacheInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
