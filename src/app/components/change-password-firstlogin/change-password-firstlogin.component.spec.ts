import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordFirstloginComponent } from './change-password-firstlogin.component';

describe('ChangePasswordFirstloginComponent', () => {
  let component: ChangePasswordFirstloginComponent;
  let fixture: ComponentFixture<ChangePasswordFirstloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordFirstloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordFirstloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
