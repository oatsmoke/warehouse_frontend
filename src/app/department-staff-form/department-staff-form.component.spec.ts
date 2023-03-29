import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentStaffFormComponent } from './department-staff-form.component';

describe('DepartmentStaffFormComponent', () => {
  let component: DepartmentStaffFormComponent;
  let fixture: ComponentFixture<DepartmentStaffFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentStaffFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentStaffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
