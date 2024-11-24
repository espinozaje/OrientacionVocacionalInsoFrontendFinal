import { ComponentFixture, TestBed } from '@angular/core/testing';

import {VocationalTestComponent} from './vocational-test.component';

describe('VocationalTestComponent', () => {
  let component: VocationalTestComponent;
  let fixture: ComponentFixture<VocationalTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocationalTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocationalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
