import {TestBed, async, inject} from '@angular/core/testing';

import { AppComponent } from './app.component';
import {SummaryComponent} from "./Components/LandingPage/current-portfolio/Subcomponents/summary-component/summary.component";
import {GetStocksService} from "./Components/LandingPage/current-portfolio/Services/get-stocks.service";
import {HttpModule} from "@angular/http";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SummaryComponent
      ],
      imports: [HttpModule],
      providers: [GetStocksService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
