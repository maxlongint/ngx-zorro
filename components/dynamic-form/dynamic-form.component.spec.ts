import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicFormComponent } from './dynamic-form.component';

describe('NgxDynamicFormComponent', () => {
    let component: NgxDynamicFormComponent;
    let fixture: ComponentFixture<NgxDynamicFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxDynamicFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxDynamicFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
