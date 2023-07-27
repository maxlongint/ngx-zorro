import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDialogComponent } from './dialog.component';

describe('DialogComponent', () => {
    let component: NgxDialogComponent;
    let fixture: ComponentFixture<NgxDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
