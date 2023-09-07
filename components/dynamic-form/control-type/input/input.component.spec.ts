import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxInputComponent } from './input.component';

describe('NgxInputComponent', () => {
    let component: NgxInputComponent;
    let fixture: ComponentFixture<NgxInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxInputComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
