import { TestBed } from '@angular/core/testing';

import { NgxLoadingService } from './loading.service';

describe('NgxLoadingService', () => {
    let service: NgxLoadingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgxLoadingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
