import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiServerErrorComponent } from './api-server-error.component';

describe('ApiServerErrorComponent', () => {
  let component: ApiServerErrorComponent;
  let fixture: ComponentFixture<ApiServerErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiServerErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiServerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
