import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentReportFormComponent } from './equipment-report-form.component';

describe('EquipmentReportFormComponent', () => {
  let component: EquipmentReportFormComponent;
  let fixture: ComponentFixture<EquipmentReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentReportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
