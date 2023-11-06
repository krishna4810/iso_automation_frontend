import {Component, Input, SimpleChanges} from '@angular/core';
import {ChartConfiguration} from "chart.js";

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent {

  @Input() graphData?: any;
  @Input() name?: string;

  serializedData: any = {};

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
