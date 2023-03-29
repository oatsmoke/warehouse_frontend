import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentHistoryFormComponent } from './equipment-history-form.component';

describe('EquipmentHistoryFormComponent', () => {
  let component: EquipmentHistoryFormComponent;
  let fixture: ComponentFixture<EquipmentHistoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentHistoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
