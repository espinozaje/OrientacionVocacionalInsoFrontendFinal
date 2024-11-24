import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdvisorComponent } from './dashboard-advisor.component';

describe('DashboardAdvisorComponent', () => {
  let component: DashboardAdvisorComponent;
  let fixture: ComponentFixture<DashboardAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdvisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
