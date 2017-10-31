import { Component, OnInit} from '@angular/core';
import {StockDataModel} from "../../Class-Models/stock-data-model";
import {GetStocksService} from "../../Services/get-stocks.service";
import {stockObjInterface, YahooDataModel} from "../../Interfaces/yahooDataModel.interface";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {

  //encapsulated variables.
  private initialPortfolio : Map<string, StockDataModel> =  new Map<string, StockDataModel>();
  private desirePortfolio : Map<string, StockDataModel> =  new Map<string, StockDataModel>();

  //lightweight constructor for dependency injections
  constructor(private getStockService : GetStocksService) {}


  //initialize page and necessary data
  ngOnInit() {

    //initialize map variables
    this.initialPortfolio.set('AAPL', new StockDataModel( 'AAPL', 50, 0 , 0, 22));
    this.initialPortfolio.set('GOOG', new StockDataModel( 'GOOG', 200, 0, 0, 38));
    this.initialPortfolio.set('CYBR', new StockDataModel( 'CYBR', 150, 0, 0, 0 ));
    this.initialPortfolio.set('ABB', new StockDataModel( 'ABB', 900, 0, 0, 0 ));

    this.desirePortfolio.set('AAPL', new StockDataModel('AAPL', 50, 0, 0, 0));
    this.desirePortfolio.set('GOOG', new StockDataModel('GOOG', 200, 0, 0 ,0));
    this.desirePortfolio.set('GFN', new StockDataModel('GFN', 0, null, null, 25));
    this.desirePortfolio.set('ACAD', new StockDataModel('ACAD', 0, null, null, 15));

    this.getStockService.getStocks().subscribe( (stocks : YahooDataModel) => {
        // console.log(`stocks: `, stocks, `\nDesired Portfolio: `, this.desirePortfolio);
        stocks.query.results.row.forEach((stockData : stockObjInterface) => {
          let totalWorthOfShares : number;
          if( this.desirePortfolio.get(stockData.symbol)) {

            totalWorthOfShares = Number.parseFloat(stockData.price) *  this.desirePortfolio.get(stockData.symbol).getShares().valueOf();

            this.desirePortfolio.get(stockData.symbol).setStockPrice(Number.parseFloat(stockData.price));
            this.desirePortfolio.get(stockData.symbol).setTotalStockVal(totalWorthOfShares);

            if(stockData.symbol === 'GOOG' || stockData.symbol === 'AAPL') {
              this.initialPortfolio.get(stockData.symbol).setStockPrice(Number.parseFloat(stockData.price));
              this.initialPortfolio.get(stockData.symbol).setTotalStockVal(totalWorthOfShares);
            }

          } else if (this.initialPortfolio.get(stockData.symbol)) {

            totalWorthOfShares = Number.parseFloat(stockData.price) * this.initialPortfolio.get(stockData.symbol).getShares().valueOf();

            this.initialPortfolio.get(stockData.symbol).setStockPrice(Number.parseFloat(stockData.price));
            this.initialPortfolio.get(stockData.symbol).setTotalStockVal(totalWorthOfShares);
          }

          this.getStockService.setInitSummaryData(this.initialPortfolio);
          this.getStockService.setFinalSummaryData(this.desirePortfolio);

        });
      },
      (error : Error) => { console.log(error) },
      () => { console.log('[Yahoo Stock Call] Completed ... ')}
    );
  }
}
