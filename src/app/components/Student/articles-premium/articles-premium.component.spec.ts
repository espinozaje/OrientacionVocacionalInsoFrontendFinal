import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesPremiumComponent } from './articles-premium.component';

describe('ArticlesPremiumComponent', () => {
  let component: ArticlesPremiumComponent;
  let fixture: ComponentFixture<ArticlesPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesPremiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
