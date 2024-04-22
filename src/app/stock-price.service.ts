import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {
  private baseUrl = 'http://127.0.0.1:8000'; 

  constructor(private http: HttpClient) { }

  getStockPrice(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/stock-price`);
  }
}
