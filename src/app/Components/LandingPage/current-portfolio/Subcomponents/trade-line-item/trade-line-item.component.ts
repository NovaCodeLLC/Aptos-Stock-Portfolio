import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-trade-line-item',
  templateUrl: './trade-line-item.component.html',
  styleUrls: ['./trade-line-item.component.css']
})
export class TradeLineItemComponent implements OnInit {



  constructor() { }

  @Input() tracker : {[p: string]: any};
  private absVals : number;
  private symbol: string;
  private bought : any;
  private sold : any;

  ngOnInit() {
    console.log(this.tracker);
    this.symbol = this.tracker['key'];
    this.absVals = Math.abs(this.tracker['value']);

    if(this.tracker['value'] > 0) {
      this.bought = this.absVals;
    } else {
      this.sold = this.absVals;
    }

    console.log('abs: ', this.absVals, ' symbol: ', this.symbol);
  }

}
