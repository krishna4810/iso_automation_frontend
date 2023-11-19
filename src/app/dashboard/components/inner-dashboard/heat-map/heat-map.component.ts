import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ChartConfiguration} from "chart.js";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent implements OnChanges {

  @Input() heatMapData?: any;
  @Input() name?: string;
  @Input() isARR?: boolean;

  serializedData: any = {};

  constructor(private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['heatMapData'] && changes['heatMapData'].currentValue) {
      this.serializedData = changes['heatMapData'].currentValue;
      this.updateChartData();
    }
  }

  private updateChartData() {
    this.heatMapData = this.serializedData;
  }

  redirectToAnotherComponent(id: any) {
    this.router.navigate(['../', 'functionalDetails', id], {
      relativeTo: this.route,
      queryParams: id,
    });
  }
}
