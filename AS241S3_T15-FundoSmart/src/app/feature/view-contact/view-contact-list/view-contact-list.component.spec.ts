import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactListComponent } from './view-contact-list.component';

describe('ViewContactListComponent', () => {
  let component: ViewContactListComponent;
  let fixture: ComponentFixture<ViewContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewContactListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
