import { TestBed } from '@angular/core/testing';

import { EquipmentResolver } from './equipment.resolver';

describe('EquipmentResolver', () => {
  let resolver: EquipmentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EquipmentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
