import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import {HttpClient} from "@angular/common/http";
import {YahooDataModel} from "../Interfaces/yahooDataModel.interface";
import {StockDataModel} from "../Class-Models/stock-data-model";


@Injectable()
export class GetStocksService {


  private yahooFinanceURL = 'https://query.yahooapis.com/v1/public/yql?q=select+%2A+from+csv+where+%0D%0Aurl%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3DAAPL%2BGOOG%2BABB%2BCYBR%2BGFN%2BACAD%26f%3Dsl1d1t1c1ohgv%26e%3D.csv%27+%0D%0Aand+columns%3D%27symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%27&format=json&env=store://datatables.org/alltableswithkeys';
  private initSummaryData : Map<string, StockDataModel> = new Map<string, StockDataModel>();
  private finalSummaryData : Map<string, StockDataModel> = new Map<string, StockDataModel>();

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
   * get data from the summary component about the stock portfolio.
   *
   * @returns {Map<string, StockDataModel>}
   */
  getInitSummaryData() : Map<string, StockDataModel> {
    return this.initSummaryData;
  }

  /**
   * get data from the summary component about the stock portfolio.
   *
   * @returns {Map<string, StockDataModel>}
   */
  getFinalSummaryData() : Map<string, StockDataModel> {
    return this.finalSummaryData;
  }

  /**
   * used as a cross sibling way of updating data between the summary display and others as portfolios are rebalanced
   *
   * @param {Map<string, StockDataModel>} data
   */
  setInitSummaryData(data : Map<string, StockDataModel>) : void {
    this.initSummaryData = data;
  }

  /**
   * used as a cross sibling way of updating data between the summary display and others as portfolios are rebalanced
   *
   * @param {Map<string, StockDataModel>} data
   */
  setFinalSummaryData(data : Map<string, StockDataModel>) : void {
    this.finalSummaryData = data;
  }
}
