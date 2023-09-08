import { TestBed } from '@angular/core/testing';

import { NgxBlobInterceptor } from './blob.interceptor';

describe('NgxBlobInterceptor', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [NgxBlobInterceptor],
        }),
    );

    it('should be created', () => {
        const interceptor: NgxBlobInterceptor = TestBed.inject(NgxBlobInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
