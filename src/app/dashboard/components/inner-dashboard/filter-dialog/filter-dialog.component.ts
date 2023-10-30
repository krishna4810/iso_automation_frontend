import {Component} from '@angular/core';
import {FUNCTION_RATING_DETAILS} from "../../../../model/constants";
import {ApiService} from "../../../../services/api.service";
import {FilterParams} from "../../../../model/interfaces";
import {StateService} from "../../../../services/state.service";
import {de} from "date-fns/locale";

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent {
  params: any = [];
  selectedPlant?: string;
  selectedDepartment?: string;
  selectedYear?: string;
  requestParams: any;

  constructor(private apiService: ApiService, private stateService: StateService,) {
  }

  ngOnInit() {
    this.apiService.getFilterParam().subscribe(res => {
      this.params = res;
    });
  }

  applyFilter() {
    this.requestParams = {
      plant: this.selectedPlant ? this.selectedPlant : null,
      department: this.selectedDepartment ? this.selectedDepartment : null,
      year: this.selectedYear ? this.selectedYear : null
    }
    this.apiService.filterDashboard(this.requestParams).subscribe(res=> {
    })
  }
}
