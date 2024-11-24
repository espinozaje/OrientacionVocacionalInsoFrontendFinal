import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfileAdviserComponent } from './show-profile-adviser.component';

describe('ShowProfileAdviserComponent', () => {
  let component: ShowProfileAdviserComponent;
  let fixture: ComponentFixture<ShowProfileAdviserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProfileAdviserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProfileAdviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
