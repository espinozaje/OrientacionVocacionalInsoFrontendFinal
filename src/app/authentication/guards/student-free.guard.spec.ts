import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { studentFreeGuard } from './student-free.guard';

describe('studentFreeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => studentFreeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
