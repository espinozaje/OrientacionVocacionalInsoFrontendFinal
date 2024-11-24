import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAdvisorComponent } from './application-advisor.component';

describe('ApplicationAdvisorComponent', () => {
  let component: ApplicationAdvisorComponent;
  let fixture: ComponentFixture<ApplicationAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationAdvisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
