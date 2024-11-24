import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { advisorGuardGuard } from './advisor-guard.guard';

describe('advisorGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => advisorGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
