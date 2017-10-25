/**
 * Created by Thomas Lesperance on 10/24/2017.
 */
/**
 * Models the JSON object returned from Yahoo
 **/
export interface YahooDataModel {
  query: {
    count: number,
    created: string,
    lang: string,
    results: {
      row: Array<stockObjInterface>
    }
  }
}

/**
* Models the JSON object of interest within the YahooDataModel interface.
* This was created to make type identification easier within the summary component.
 **/
export interface  stockObjInterface {
  symbol: string,
  price: string,
  date: string,
  time: string,
  change: string,
  col1: string,
  high: string,
  low: string,
  col2: string
}
