import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdvisoryStudentComponent } from './list-advisory-student.component';

describe('ListAdvisoryStudentComponent', () => {
  let component: ListAdvisoryStudentComponent;
  let fixture: ComponentFixture<ListAdvisoryStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAdvisoryStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAdvisoryStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
