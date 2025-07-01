import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsClientComponent } from './sections-client.component';

describe('SectionsClientComponent', () => {
  let component: SectionsClientComponent;
  let fixture: ComponentFixture<SectionsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
