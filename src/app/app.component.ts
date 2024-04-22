import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockPriceService } from './stock-price.service';
import {NgIf} from '@angular/common';
import { StockChartComponent } from "./stock-chart/stock-chart.component";
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NgIf, StockChartComponent, MatNativeDateModule ],
    providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'en-US' }],
})
export class AppComponent {
  stockPrice: any;

  constructor() { }

}
