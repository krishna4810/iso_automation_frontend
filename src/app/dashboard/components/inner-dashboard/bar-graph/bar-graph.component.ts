import { Component } from '@angular/core';
import {ChartConfiguration} from "chart.js";

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent {
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    datasets: [
      { data: [ 65, 59, 80, 81, 11, 45], label: 'Gross Risk' },
      { data: [ 28, 48, 40, 19, 12, 78 ], label: 'Residual Risk' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor() {
  }
}
