import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentTransferFormComponent } from './equipment-transfer-form.component';

describe('EquipmentTransferFormComponent', () => {
  let component: EquipmentTransferFormComponent;
  let fixture: ComponentFixture<EquipmentTransferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentTransferFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentTransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
