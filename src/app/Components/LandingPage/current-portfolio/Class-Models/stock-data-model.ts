/**
 * This class models a stock line item in the initial portfolio display
 */
export class StockDataModel {

  /**
   * Creates an instance of the StockDataModel Object
   *
   * @param {String} symbol - Stock symbol
   * @param {Number} shares - Number of shares owned
   * @param {Number} stockPrice - Price of the stock
   * @param {Number} totalStockVal - Total value of owned shares (shares * stockPrice)
   * @param {Number} sharePercentage - Percentage of total stock to be obtained for the total desired final portfolio
   */
  constructor(private symbol : string,
              private shares : number,
              private stockPrice? : number,
              private totalStockVal? : number,
              private sharePercentage? : number){}

  /**
   * set stock symbol
    * @param {string} symbol
   */
  public setSymbol( symbol : string ) : void { this.symbol = symbol }

  /**
   * set the total number of owned shares
   * @param {number} shares
   */
  public setShares( shares : number ) : void { this.shares = shares }

  /**
   * set stock price
   * @param {number} stockPrice
   */
  public setStockPrice( stockPrice : number ) : void { this.stockPrice = stockPrice }

  /**
   * set the sum total value of all owned units
   * @param {number} totalStockVal
   */
  public setTotalStockVal( totalStockVal : number ) : void { this.totalStockVal = totalStockVal }

  /**
   * set the desired total percentage that this stock will make up in the final portfolio
   * @param {number} sharePercentage
   */
  public setSharePercentage( sharePercentage : number ) : void { this.sharePercentage = sharePercentage }


  /**
   * get stock symbol
   * @returns {string}
   */
  public getSymbol() : string { return this.symbol }

  /**
   * get the total number of owned shares
   * @returns {number}
   */
  public getShares() : number { return this.shares }

  /**
   * get the stock's price per unit
   * @returns {number}
   */
  public getStockPrice() : number { return this.stockPrice }

  /**
   * get the sum total value of all owned units
   * @returns {number}
   */
  public getTotalStockVal() : number { return this.totalStockVal }

  /**
   * get the desired total percentage that this stock will make up in the final portfolio
   * @returns {number}
   */
  public getSharePercentage() : number { return this.sharePercentage}
}
