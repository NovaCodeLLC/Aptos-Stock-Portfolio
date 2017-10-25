import {Component, Input, OnInit} from '@angular/core';
import {StockDataModel} from "../../Class-Models/stock-data-model";

@Component({
  selector: 'app-stock-line-item',
  templateUrl: './stock-line-item.component.html',
  styleUrls: ['./stock-line-item.component.css']
})
export class StockLineItemComponent implements OnInit {

  constructor() { }

  @Input() lineItem : StockDataModel;

  ngOnInit() {}

}
