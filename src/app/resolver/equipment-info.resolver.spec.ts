import { TestBed } from '@angular/core/testing';

import { EquipmentInfoResolver } from './equipment-info.resolver';

describe('EquipmentInfoResolver', () => {
  let resolver: EquipmentInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EquipmentInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
