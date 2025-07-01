import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemillasGrandesClienteComponent } from './semillas-grandes-cliente.component';

describe('SemillasGrandesClienteComponent', () => {
  let component: SemillasGrandesClienteComponent;
  let fixture: ComponentFixture<SemillasGrandesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemillasGrandesClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemillasGrandesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
