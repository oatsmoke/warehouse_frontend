import { TestBed } from '@angular/core/testing';

import { PartitionResolver } from './partition.resolver';

describe('PartitionResolver', () => {
  let resolver: PartitionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PartitionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
