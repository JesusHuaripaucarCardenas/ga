import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeGuideListComponent } from './make-guide-list.component';

describe('MakeGuideListComponent', () => {
  let component: MakeGuideListComponent;
  let fixture: ComponentFixture<MakeGuideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeGuideListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeGuideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
