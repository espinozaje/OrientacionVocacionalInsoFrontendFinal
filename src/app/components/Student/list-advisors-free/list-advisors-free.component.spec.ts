import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdvisorsFreeComponent } from './list-advisors-free.component';

describe('ListAdvisorsFreeComponent', () => {
  let component: ListAdvisorsFreeComponent;
  let fixture: ComponentFixture<ListAdvisorsFreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAdvisorsFreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAdvisorsFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
