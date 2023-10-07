import { TestBed } from '@angular/core/testing';

import { NgxCacheService } from './cache.service';

describe('NgxCacheService', () => {
    let service: NgxCacheService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgxCacheService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
