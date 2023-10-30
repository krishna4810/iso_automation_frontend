import {Component, ViewChild} from '@angular/core';
import {UserTableComponent} from "../master-data/user-table/user-table.component";
import {HiraTableComponent} from "../function-details/hira-table/hira-table.component";
import {ApiService} from "../../../services/api.service";
import {de} from "date-fns/locale";
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "./filter-dialog/filter-dialog.component";
import {StateService} from "../../../services/state.service";
import {MatExpansionPanel} from "@angular/material/expansion";

@Component({
  selector: 'app-inner-dashboard',
  templateUrl: './inner-dashboard.component.html',
  styleUrls: ['./inner-dashboard.component.scss']
})
export class InnerDashboardComponent{
  @ViewChild(UserTableComponent) hira!: HiraTableComponent;
  @ViewChild('panel') panel!: MatExpansionPanel;


  params: any = [];
  selectedPlant?: string;
  selectedDepartment?: string;
  selectedYear?: string;
  userState: any;
  currentYear = new Date().getFullYear();
  dashboardData?: any;

  constructor(private dialog: MatDialog, private apiService: ApiService, private stateService: StateService,) {
  }

  ngOnInit() {
    this.apiService.filterDashboard(this.getCurrentParam()).subscribe(res=> { debugger
      this.dashboardData = res;
    })
  }

  getCurrentParam(): any{
    let params: any;
    this.apiService.getFilterParam().subscribe(res => {
      this.params = res;
    });
    this.stateService.stateChanged.subscribe((state) => {
      this.userState = state?.loggedInUserData;
      this.selectedPlant = this.userState?.userData?.Plant;
      this.selectedDepartment = this.userState?.userData?.Department;
      this.selectedYear = this.currentYear.toString();
      params = {
        plant: this.selectedPlant,
        department: this.selectedDepartment,
        year: this.selectedYear
      }
    });

    return params;
  }
  filterUser(event: Event){
    this.hira?.applyFilter(event);
  }

  openFilterDialog() {
    this.dialog.open(FilterDialogComponent);
  }

  openPanel() {
    this.panel.open();
  }
}
