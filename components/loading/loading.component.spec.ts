import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLoadingComponent } from './loading.component';

describe('NgxLoadingComponent', () => {
    let component: NgxLoadingComponent;
    let fixture: ComponentFixture<NgxLoadingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxLoadingComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxLoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
