import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxZorroComponent } from './ngx-zorro.component';

describe('NgxZorroComponent', () => {
  let component: NgxZorroComponent;
  let fixture: ComponentFixture<NgxZorroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxZorroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxZorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
