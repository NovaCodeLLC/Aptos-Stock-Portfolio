import {Component, OnInit} from '@angular/core';
import {StockDataModel} from "./Class-Models/stock-data-model";
import {GetStocksService} from "./Services/get-stocks.service";
import {stockObjInterface, YahooDataModel} from "./Interfaces/yahooDataModel.interface";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {

  //encapsulated variables.
  private initialPortfolio = null;
  private desirePortfolio = null;
  private myBool = false;

  //lightweight constructor for dependency injections
  constructor(private getStockService : GetStocksService) {}


  //initialize page and necessary data
  ngOnInit() {
    this.initialPortfolio = new Map<string, StockDataModel>();
    this.desirePortfolio = new Map<string, StockDataModel>();

    //initialize map variables
    this.initialPortfolio.set('AAPL', new StockDataModel( 'AAPL', 50, null , null, 22));
    this.initialPortfolio.set('GOOG', new StockDataModel( 'GOOG', 200, null, null, 38));
    this.initialPortfolio.set('CYBR', new StockDataModel( 'CYBR', 150, null, null, null ));
    this.initialPortfolio.set('ABB', new StockDataModel( 'ABB', 900, null, null, null ));

    this.desirePortfolio.set('AAPL', this.initialPortfolio.get('AAPL'));
    this.desirePortfolio.set('GOOG', this.initialPortfolio.get('GOOG'));
    this.desirePortfolio.set('GFN', new StockDataModel('GFN', 0, null, null, 25));
    this.desirePortfolio.set('ACAD', new StockDataModel('ACAD', 0, null, 15));

    this.getStockService.getStocks().subscribe( (stocks : YahooDataModel) => {
        // console.log(`stocks: `, stocks, `\nDesired Portfolio: `, this.desirePortfolio);
        stocks.query.results.row.forEach((stockData : stockObjInterface) => {
          let totalWorthOfShares;
          if(this.desirePortfolio.get(stockData.symbol)) {

            totalWorthOfShares = Number.parseFloat(stockData.price) * this.desirePortfolio.get(stockData.symbol).getShares();

            this.desirePortfolio.get(stockData.symbol).setStockPrice(Number.parseFloat(stockData.price));
            this.desirePortfolio.get(stockData.symbol).setTotalStockVal(totalWorthOfShares);
          } else if (this.initialPortfolio.get(stockData.symbol)) {

            totalWorthOfShares = Number.parseFloat(stockData.price) * this.initialPortfolio.get(stockData.symbol).getShares();

            this.initialPortfolio.get(stockData.symbol).setStockPrice(Number.parseFloat(stockData.price));
            this.initialPortfolio.get(stockData.symbol).setTotalStockVal(totalWorthOfShares);
          }
        });
      },
      (error : Error) => { console.log(error) },
      () => {
          this.myBool = true;
          // this.cdRef.detectChanges();
          console.log('[Yahoo Stock Call] Completed ... ');
    })
  }

  /**
   * Gets an array representing the initially owned stocks
   * @returns {Map<string,StockDataModel>>}
   */
  getInitialPortfolioData() : Map<string,StockDataModel> {
    return this.initialPortfolio;
  }

  /**
   * gets an array representing the new stock portfolio
   * @returns {Map<string,StockDataModel>}
   */
  getDesiredPortfolioData() : Map<string,StockDataModel>{
    return this.desirePortfolio;
  }

}
