import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitDataClientComponent } from './fruit-data-client.component';

describe('FruitDataClientComponent', () => {
  let component: FruitDataClientComponent;
  let fixture: ComponentFixture<FruitDataClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitDataClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruitDataClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
