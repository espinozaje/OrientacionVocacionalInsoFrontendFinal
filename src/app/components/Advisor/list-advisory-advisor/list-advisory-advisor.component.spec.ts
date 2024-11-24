import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdvisoryAdvisorComponent } from './list-advisory-advisor.component';

describe('ListAdvisoryAdvisorComponent', () => {
  let component: ListAdvisoryAdvisorComponent;
  let fixture: ComponentFixture<ListAdvisoryAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAdvisoryAdvisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAdvisoryAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
