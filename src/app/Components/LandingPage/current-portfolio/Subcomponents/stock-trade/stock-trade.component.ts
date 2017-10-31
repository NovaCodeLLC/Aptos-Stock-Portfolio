import { Component, OnInit } from '@angular/core';
import {StockDataModel} from "../../Class-Models/stock-data-model";
import {GetStocksService} from "../../Services/get-stocks.service";
import {YahooDataModel} from "../../Interfaces/yahooDataModel.interface";
import {SummaryComponent} from "../summary-component/summary.component";
import {allowableArgs} from "../../Pipes-Directives/Pipes/IterableMap";

@Component({
  selector: 'app-stock-trade',
  templateUrl: './stock-trade.component.html',
  styleUrls: ['./stock-trade.component.css']
})
export class StockTradeComponent implements OnInit {

  private stockMetaData : StockMetaData;
  private collectedStockData : Map< string, string > = new Map<string, string>();
  private pipeArg: allowableArgs;

  constructor(private getStockData: GetStocksService) { }

  ngOnInit() {

    this.getStockData.getStocks().subscribe(
      (allStockDat : YahooDataModel) => {
        allStockDat.query.results.row.forEach((stockDat) => {
          this.collectedStockData.set(stockDat.symbol, stockDat.price);
        });
        this.calculateTrades();
      },
      (error: Error) => { console.log(error) },
      () => { console.log('[Stock Trader Received Dat] Complete ...')}
    );
  }

  private calculateTrades() : void {
    //getting preliminary data
    const stockInfo = this.getStockData.getInitSummaryData();
     this.stockMetaData = new MetaData( null,
                                                      {current: new Map<string, number>(), final: new Map<string, number>()},
                                                      new Map<string, number>(),
                                                      new Map<string, number>(),
                                                      new Map<string, number>());

    this.stockMetaData.totalPortValue = (stockInfo.get('AAPL').getTotalStockVal().valueOf() + stockInfo.get('GOOG').getTotalStockVal().valueOf() +
                      stockInfo.get('ABB').getTotalStockVal().valueOf() +  stockInfo.get('CYBR').getTotalStockVal().valueOf());

    //get starting point of our staple stocks
    this.stockMetaData.portStockPercentages['current'].set('GOOG', Number(((stockInfo.get('GOOG').getTotalStockVal().valueOf() / this.stockMetaData["totalPortValue"])*100).toFixed(2)));
    this.stockMetaData.portStockPercentages['current'].set('AAPL', Number(((stockInfo.get('AAPL').getTotalStockVal().valueOf() / this.stockMetaData["totalPortValue"])*100).toFixed(2)));

    //setup desired percentages
    this.stockMetaData.portStockPercentages['final'].set('GOOG', .38);
    this.stockMetaData.portStockPercentages['final'].set('AAPL', .22);
    this.stockMetaData.portStockPercentages['final'].set('GFN', .25);
    this.stockMetaData.portStockPercentages['final'].set('ACAD', .15);

    //Find number of shares for each stock
    this.stockMetaData.shares.set('GOOG', Math.floor((this.stockMetaData.totalPortValue * this.stockMetaData.portStockPercentages['final'].get('GOOG'))/(Number.parseFloat(this.collectedStockData.get('GOOG')))));
    this.stockMetaData.shares.set('AAPL', Math.floor((this.stockMetaData.totalPortValue * this.stockMetaData.portStockPercentages['final'].get('AAPL'))/(Number.parseFloat(this.collectedStockData.get('AAPL')))));
    this.stockMetaData.shares.set('GFN', Math.floor((this.stockMetaData.totalPortValue * this.stockMetaData.portStockPercentages['final'].get('GFN'))/(Number.parseFloat(this.collectedStockData.get('GFN')))));
    this.stockMetaData.shares.set('ACAD', Math.floor((this.stockMetaData.totalPortValue * this.stockMetaData.portStockPercentages['final'].get('ACAD'))/(Number.parseFloat(this.collectedStockData.get('ACAD')))));

    //set new shares on display
    this.getStockData.getFinalSummaryData().get('GOOG').setShares(this.stockMetaData.shares.get('GOOG'));
    this.getStockData.getFinalSummaryData().get('AAPL').setShares(this.stockMetaData.shares.get('AAPL'));
    this.getStockData.getFinalSummaryData().get('GFN').setShares(this.stockMetaData.shares.get('GFN'));
    this.getStockData.getFinalSummaryData().get('ACAD').setShares(this.stockMetaData.shares.get('ACAD'));

    console.log('get stock service', this.getStockData.getFinalSummaryData().get('GOOG').getStockPrice());

    this.getStockData.getFinalSummaryData().get('GOOG').setTotalStockVal((this.stockMetaData.shares.get('GOOG')* this.getStockData.getFinalSummaryData().get('GOOG').getStockPrice()));
    this.getStockData.getFinalSummaryData().get('AAPL').setTotalStockVal(this.stockMetaData.shares.get('AAPL')* this.getStockData.getFinalSummaryData().get('AAPL').getStockPrice());
    this.getStockData.getFinalSummaryData().get('GFN').setTotalStockVal(this.stockMetaData.shares.get('GFN')* this.getStockData.getFinalSummaryData().get('GFN').getStockPrice());
    this.getStockData.getFinalSummaryData().get('ACAD').setTotalStockVal(this.stockMetaData.shares.get('ACAD')* this.getStockData.getFinalSummaryData().get('ACAD').getStockPrice());

    this.stockMetaData.numberSharesTraded.set('GOOG', (this.getStockData.getInitSummaryData().get('GOOG').getShares() - this.stockMetaData.shares.get('GOOG')));
    this.stockMetaData.numberSharesTraded.set('AAPL', (this.getStockData.getInitSummaryData().get('AAPL').getShares() - this.stockMetaData.shares.get('AAPL')));
    this.stockMetaData.numberSharesTraded.set('GFN', 0 - this.stockMetaData.shares.get('GFN'));
    this.stockMetaData.numberSharesTraded.set('ACAD', 0 - this.stockMetaData.shares.get('ACAD'));
  }
}

export class MetaData implements StockMetaData {

  constructor(
    public totalPortValue : number,

  public portStockPercentages: {
      current: Map<string, number>,
      final : Map<string, number>
    },

    public shares: Map<string, number>,
    public stockShareValues: Map<string, number>,
    public numberSharesTraded: Map<string, number>){}
}

export interface StockMetaData {
  totalPortValue : number,
  portStockPercentages: { [p: string]: Map<string, number> }
  shares: Map<string, number>,
  stockShareValues: Map<string, number>,
  numberSharesTraded: Map<string, number>
}
