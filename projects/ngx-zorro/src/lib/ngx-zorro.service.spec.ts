import { TestBed } from '@angular/core/testing';

import { NgxZorroService } from './ngx-zorro.service';

describe('NgxZorroService', () => {
  let service: NgxZorroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxZorroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
