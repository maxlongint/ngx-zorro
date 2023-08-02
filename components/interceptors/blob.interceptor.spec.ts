import { TestBed } from '@angular/core/testing';

import { BlobInterceptor } from './blob.interceptor';

describe('BlobInterceptor', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [BlobInterceptor],
        })
    );

    it('should be created', () => {
        const interceptor: BlobInterceptor = TestBed.inject(BlobInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
