import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnChanges {

  constructor() {}

  @Input() barGraphData?: any;

  public barChartLegend = true;
  public barChartPlugins = [];
  serializedData: any = {};
  public barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  private donutColors = [
    {
      backgroundColor: [
        '#ced',
        '#fda',
      ]
    }
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['barGraphData'] && changes['barGraphData'].currentValue) {
      this.serializedData = changes['barGraphData'].currentValue;
      this.updateChartData();
    }
  }

  private updateChartData() {
    this.barChartData = {
      labels: this.serializedData['labels'],
      datasets: [
        { data: this.serializedData['gross_risks'], label: 'Gross Risk' },
        { data: this.serializedData['residual_risks'], label: 'Residual Risk' }
      ]
    };
  }
}
