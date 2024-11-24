import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvisoryStudentComponent } from './create-advisory-student.component';

describe('CreateAdvisoryStudentComponent', () => {
  let component: CreateAdvisoryStudentComponent;
  let fixture: ComponentFixture<CreateAdvisoryStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdvisoryStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdvisoryStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
