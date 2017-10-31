import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeLineItemComponent } from './trade-line-item.component';

describe('TradeLineItemComponent', () => {
  let component: TradeLineItemComponent;
  let fixture: ComponentFixture<TradeLineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeLineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
