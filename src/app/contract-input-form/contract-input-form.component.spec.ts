import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInputFormComponent } from './contract-input-form.component';

describe('ContractInputFormComponent', () => {
  let component: ContractInputFormComponent;
  let fixture: ComponentFixture<ContractInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractInputFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
