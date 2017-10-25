import { TestBed, inject } from '@angular/core/testing';

import { GetStocksService } from './get-stocks.service';
import {Http, HttpModule} from "@angular/http";

describe('GetStocksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GetStocksService]
    });
  });

  it('should be created', inject([GetStocksService], (service: GetStocksService) => {
    expect(service).toBeTruthy();
  }));
});
