import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConvertorHeaderComponent } from './currency-convertor-header.component';

describe('CurrencyConvertorHeaderComponent', () => {
  let component: CurrencyConvertorHeaderComponent;
  let fixture: ComponentFixture<CurrencyConvertorHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyConvertorHeaderComponent]
    });
    fixture = TestBed.createComponent(CurrencyConvertorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
