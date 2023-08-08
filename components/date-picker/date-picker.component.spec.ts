import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatePickerComponent } from './date-picker.component';

describe('DatePickerComponent', () => {
    let component: NgxDatePickerComponent;
    let fixture: ComponentFixture<NgxDatePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxDatePickerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxDatePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
