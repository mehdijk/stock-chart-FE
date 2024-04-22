import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { StockPriceService } from '../stock-price.service';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [],
  templateUrl: './stock-chart.component.html',
  styleUrl: './stock-chart.component.css'
})


export class StockChartComponent implements OnInit {

  chart: any;
  stockPriceData: any[] =[] ;

  constructor(private stockPriceService: StockPriceService) { }

  ngOnInit(): void {
    // Fetch stock price data
    this.fetchStockPriceData();
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
}

