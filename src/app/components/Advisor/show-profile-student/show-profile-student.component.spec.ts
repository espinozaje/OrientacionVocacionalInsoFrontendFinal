import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfileStudentComponent } from './show-profile-student.component';

describe('ShowProfileStudentComponent', () => {
  let component: ShowProfileStudentComponent;
  let fixture: ComponentFixture<ShowProfileStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProfileStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProfileStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
