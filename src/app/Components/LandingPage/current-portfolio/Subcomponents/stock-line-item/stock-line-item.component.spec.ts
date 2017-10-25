import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLineItemComponent } from './stock-line-item.component';

describe('StockLineItemComponent', () => {
  let component: StockLineItemComponent;
  let fixture: ComponentFixture<StockLineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockLineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
