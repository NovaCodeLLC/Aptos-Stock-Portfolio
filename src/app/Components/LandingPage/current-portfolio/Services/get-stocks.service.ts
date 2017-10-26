import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import {HttpClient} from "@angular/common/http";
import {YahooDataModel} from "../Interfaces/yahooDataModel.interface";
import {StockDataModel} from "../Class-Models/stock-data-model";


@Injectable()
export class GetStocksService {

  private yahooFinanceURL = 'https://query.yahooapis.com/v1/public/yql?q=select+%2A+from+csv+where+%0D%0Aurl%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3DAAPL%2BGOOG%2BABB%2BCYBR%2BGFN%2BACAD%26f%3Dsl1d1t1c1ohgv%26e%3D.csv%27+%0D%0Aand+columns%3D%27symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%27&format=json&env=store://datatables.org/alltableswithkeys';
  private initPort : Map<string, StockDataModel>;
  private desiredPort : Map<string, StockDataModel>;
  private shareable : Map<string, StockDataModel> = new Map<string, Map<string, StockDataModel>>();

  constructor(private http : HttpClient) { }

  /**
   * Gets stock data from Yahoo service.
   *
   * @returns {Observable<YahooDataModel>}
   */
  getStocks() : Observable<YahooDataModel>{
    return this.http.get<YahooDataModel>(this.yahooFinanceURL)
  }

  /**
   * Provides all known stock data for use among unrelated components.
   *
   * @returns {Observable} Emits a single item of type Map<string, StockDataModel> where one can find all stock info by using its symbol as a key
   */
  shareStockData() : Observable {
    this.shareable.set('AAPL', this.initPort.get('AAPL'));
    this.shareable.set('CYBR', this.initPort.get('CYBR'));
    this.shareable.set('ABB', this.initPort.get('ABB'));
    this.shareable.set('GOOG', this.initPort.get('GOOG'));

    this.shareable.set('GFN', this.desiredPort.get('GFN'));
    this.shareable.set('ACAD', this.desiredPort.get('ACAD'));

    return Observable.from(this.shareable);
  }

  /**
   * set initial portfolio data for sharing across unrelated components
   * @param {Map<string, StockDataModel>} initData
   */
  setInitialPortfolioData(initData : Map<string, StockDataModel>) : void { this.initPort = initData; }

  /**
   * set some preliminary data for the final portfolio to share across unrelated components
   * @param {Map<string, StockDataModel>} prelimData
   */
  setFinalPortfolioPrelimData(prelimData : Map<string, StockDataModel>) : void { this.desiredPort = prelimData }

}
