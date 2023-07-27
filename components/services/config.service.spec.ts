import { TestBed } from '@angular/core/testing';

import { NgxConfigService } from './config.service';

describe('NgxConfigService', () => {
    let service: NgxConfigService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgxConfigService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
