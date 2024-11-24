import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPremiumComponent } from './dashboard-premium.component';

describe('DashboardPremiumComponent', () => {
  let component: DashboardPremiumComponent;
  let fixture: ComponentFixture<DashboardPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPremiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
