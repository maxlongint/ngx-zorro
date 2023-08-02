import { TestBed } from '@angular/core/testing';

import { DownFileService } from './down.file.service';

describe('DownFileService', () => {
    let service: DownFileService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DownFileService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
