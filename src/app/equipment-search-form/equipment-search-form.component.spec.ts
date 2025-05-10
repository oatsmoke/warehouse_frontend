import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSearchFormComponent } from './equipment-search-form.component';

describe('EquipmentSearchFormComponent', () => {
  let component: EquipmentSearchFormComponent;
  let fixture: ComponentFixture<EquipmentSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
