import {Component, Input, OnInit} from '@angular/core';
import {StockDataModel} from "../../Class-Models/stock-data-model";

@Component({
  selector: 'portfolio-component',
  templateUrl: './portfolio-component.component.html',
  styleUrls: ['./portfolio-component.component.css']
})
export class PortfolioComponentComponent implements OnInit {

  @Input() portfolioDataSet : Map<string, StockDataModel>;

  constructor() { }

  ngOnInit() {
  }

}
