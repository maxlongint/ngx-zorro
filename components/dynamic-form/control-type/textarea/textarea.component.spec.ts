import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTextareaComponent } from './textarea.component';

describe('NgxTextareaComponent', () => {
    let component: NgxTextareaComponent;
    let fixture: ComponentFixture<NgxTextareaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxTextareaComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxTextareaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
