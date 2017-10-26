import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SummaryComponent } from './Components/LandingPage/current-portfolio/Subcomponents/summary-component/summary.component';
import {GetStocksService} from "./Components/LandingPage/current-portfolio/Services/get-stocks.service";
import {HttpClientModule} from "@angular/common/http";
import { StockLineItemComponent } from './Components/LandingPage/current-portfolio/Subcomponents/stock-line-item/stock-line-item.component';
import { PortfolioComponentComponent } from './Components/LandingPage/current-portfolio/Subcomponents/portfolio-component/portfolio-component.component';
import {CodeHighlighterModule, TabViewModule} from "primeng/primeng";
import {CommonModule} from "@angular/common";
import {IterableMap} from "./Components/LandingPage/current-portfolio/Pipes-Directives/Pipes/IterableMap";
import { PanelModule } from 'primeng/primeng';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { StockTradeComponent } from './Components/LandingPage/current-portfolio/Subcomponents/stock-trade/stock-trade.component';
import { TradeLineItemComponent } from './Components/LandingPage/current-portfolio/Subcomponents/trade-line-item/trade-line-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    StockLineItemComponent,
    PortfolioComponentComponent,
    IterableMap,
    StockTradeComponent,
    TradeLineItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    TabViewModule,
    CodeHighlighterModule,
    PanelModule,
    BrowserAnimationsModule
  ],
  providers: [GetStocksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
