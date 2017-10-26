import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {StockDataModel} from "../../Class-Models/stock-data-model";
import {GetStocksService} from "../../Services/get-stocks.service";
import { MockBackend } from "@angular/http/testing";
import {Http, HttpModule, XHRBackend} from "@angular/http";
import * as _ from 'underscore';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GetStocksService, { provide: XHRBackend, useClass: MockBackend }],
      declarations: [ SummaryComponent ],
    })
    .compileComponents();
  }));

  beforeEach(async( () => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', async(() => {
      expect(component).toBeTruthy();
  }));

 it('Ensure array of initial portfolio matches the provided information for this exercise', async(() => {
   let expectedSymbols : Map<string,StockDataModel> =  new Map<string, StockDataModel>();
   expectedSymbols.set('AAPL', new StockDataModel( 'AAPL', 50, null , null, 22));
   expectedSymbols.set('GOOG', new StockDataModel( 'GOOG', 200, null, null, 38));
   expectedSymbols.set('CYBR', new StockDataModel( 'CYBR', 150 ));
   expectedSymbols.set('ABB', new StockDataModel( 'ABB', 900 ));

   let arrayEquality = _.isEqual(component.getInitialPortfolioData(), expectedSymbols);

   if(!arrayEquality) console.log(
     `\n==================================\n==================================`+
     `\n\nEnsure array of initial Portfolio matches the provided information for this exercise: FAILED
      \n==================================
      \nexpected values: `, expectedSymbols,
     `\nactual values: `, component.getInitialPortfolioData(),
     `\ntruthy check: ${arrayEquality}`,
     '\n==================================\n=================================='
   );

   expect(arrayEquality).toBe(true);
  }));
});
