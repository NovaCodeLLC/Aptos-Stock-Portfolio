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
  constructor(private symbol : String,
              private shares : Number,
              private stockPrice? : Number,
              private totalStockVal? : Number,
              private sharePercentage? : Number){}

  /**
   * set stock symbol
    * @param {String} symbol
   */
  public setSymbol( symbol : String ) : void { this.symbol = symbol }

  /**
   * set the total number of owned shares
   * @param {Number} shares
   */
  public setShares( shares : Number ) : void { this.shares = shares }

  /**
   * set stock price
   * @param {Number} stockPrice
   */
  public setStockPrice( stockPrice : Number ) : void { this.stockPrice = stockPrice }

  /**
   * set the sum total value of all owned units
   * @param {Number} totalStockVal
   */
  public setTotalStockVal( totalStockVal : Number ) : void { this.totalStockVal = totalStockVal }

  /**
   * set the desired total percentage that this stock will make up in the final portfolio
   * @param {Number} sharePercentage
   */
  public setSharePercentage( sharePercentage : Number ) : void { this.sharePercentage = sharePercentage }


  /**
   * get stock symbol
   * @returns {String}
   */
  public getSymbol() : String { return this.symbol }

  /**
   * get the total number of owned shares
   * @returns {Number}
   */
  public getShares() : Number { return this.shares }

  /**
   * get the stock's price per unit
   * @returns {Number}
   */
  public getStockPrice() : Number { return this.stockPrice }

  /**
   * get the sum total value of all owned units
   * @returns {Number}
   */
  public getTotalStockVal() : Number { return this.totalStockVal }

  /**
   * get the desired total percentage that this stock will make up in the final portfolio
   * @returns {Number}
   */
  public getSharePercentage() : Number { return this.sharePercentage}
}
