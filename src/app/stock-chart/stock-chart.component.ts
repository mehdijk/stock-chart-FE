import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { StockPriceService } from '../stock-price.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [],
  templateUrl: './stock-chart.component.html',
  styleUrl: './stock-chart.component.css'
})


export class StockChartComponent implements OnInit, OnDestroy {

  chart: any;
  stockPriceData: any[] = [];
  private dataRefreshSubscription: Subscription = new Subscription;

  constructor(private stockPriceService: StockPriceService) { }

  ngOnInit(): void {
    // Fetch stock price data initially
    this.fetchStockPriceData();
    // Schedule data refresh every minute
    this.scheduleDataRefresh();
  }

  ngOnDestroy(): void {
    // Unsubscribe from data refresh subscription to avoid memory leaks
    if (this.dataRefreshSubscription) {
      this.dataRefreshSubscription.unsubscribe();
    }
  }

  fetchStockPriceData(): void {
    this.stockPriceService.getStockPrice()
      .subscribe(data => {
        this.stockPriceData = data;
        // Call method to render chart
        this.renderChart();
      }, error => {
        console.error('Error fetching stock price data:', error);
      });
  }

  renderChart(): void {
    Chart.register(...registerables);

    // Destroy the existing chart to avoid duplicates
    if (this.chart) {
      this.chart.destroy();
    }

    // Render chart using Chart.js
    this.chart = new Chart('stockChart', {
      type: 'line',
      data: {
        labels: this.stockPriceData.map(item => item[0]),
        datasets: [{
          label: 'Meta Stock',
          data: this.stockPriceData.map(item => item[1]),
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price'
            }
          }
        }
      }
    });
  }

  scheduleDataRefresh(): void {
    // Subscribe to interval to refresh data every minute
    this.dataRefreshSubscription = interval(60000) // 60000 milliseconds 
      .subscribe(() => {
        console.log('refresh')
        this.fetchStockPriceData();
      });
  }
}

