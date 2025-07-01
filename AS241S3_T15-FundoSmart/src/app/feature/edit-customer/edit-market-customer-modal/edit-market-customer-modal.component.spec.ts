import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMarketCustomerModalComponent } from './edit-market-customer-modal.component';

describe('EditMarketCustomerModalComponent', () => {
  let component: EditMarketCustomerModalComponent;
  let fixture: ComponentFixture<EditMarketCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMarketCustomerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMarketCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
