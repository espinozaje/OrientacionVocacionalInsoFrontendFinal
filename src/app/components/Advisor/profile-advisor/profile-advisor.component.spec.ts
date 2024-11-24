import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdvisorComponent } from './profile-advisor.component';

describe('ProfileAdvisorComponent', () => {
  let component: ProfileAdvisorComponent;
  let fixture: ComponentFixture<ProfileAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAdvisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
