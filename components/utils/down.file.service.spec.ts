import { TestBed } from '@angular/core/testing';

import { NgxDownFileService } from './down.file.service';

describe('NgxDownFileService', () => {
    let service: NgxDownFileService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgxDownFileService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
