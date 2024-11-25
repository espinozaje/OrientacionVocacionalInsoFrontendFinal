import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStudentPremiumComponent } from './profile-student-premium.component';

describe('ProfileStudentPremiumComponent', () => {
  let component: ProfileStudentPremiumComponent;
  let fixture: ComponentFixture<ProfileStudentPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileStudentPremiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileStudentPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
