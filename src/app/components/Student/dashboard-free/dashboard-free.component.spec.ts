import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFreeComponent } from './dashboard-free.component';

describe('DashboardFreeComponent', () => {
  let component: DashboardFreeComponent;
  let fixture: ComponentFixture<DashboardFreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
