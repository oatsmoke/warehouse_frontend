import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentReplaceFormComponent } from './equipment-replace-form.component';

describe('EquipmentReplaceFormComponent', () => {
  let component: EquipmentReplaceFormComponent;
  let fixture: ComponentFixture<EquipmentReplaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentReplaceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentReplaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
