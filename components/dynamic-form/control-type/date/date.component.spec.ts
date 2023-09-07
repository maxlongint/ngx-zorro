import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDateComponent } from './date.component';

describe('NgxDateComponent', () => {
    let component: NgxDateComponent;
    let fixture: ComponentFixture<NgxDateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxDateComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxDateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
