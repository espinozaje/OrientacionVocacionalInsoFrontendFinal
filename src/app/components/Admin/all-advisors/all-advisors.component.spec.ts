import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdvisorsComponent } from './all-advisors.component';

describe('AllAdvisorsComponent', () => {
  let component: AllAdvisorsComponent;
  let fixture: ComponentFixture<AllAdvisorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAdvisorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAdvisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
