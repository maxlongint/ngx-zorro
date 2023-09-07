import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNumberComponent } from './number.component';

describe('NgxNumberComponent', () => {
    let component: NgxNumberComponent;
    let fixture: ComponentFixture<NgxNumberComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxNumberComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxNumberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
