import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdvisorsComponent } from './my-advisors.component';

describe('MyAdvisorsComponent', () => {
  let component: MyAdvisorsComponent;
  let fixture: ComponentFixture<MyAdvisorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAdvisorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdvisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
