import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactFormComponent } from './view-contact-form.component';

describe('ViewContactFormComponent', () => {
  let component: ViewContactFormComponent;
  let fixture: ComponentFixture<ViewContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewContactFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
