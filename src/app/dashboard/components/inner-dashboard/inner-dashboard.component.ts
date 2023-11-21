import {Component, ViewChild} from '@angular/core';
import {UserTableComponent} from "../master-data/user-table/user-table.component";
import {HiraTableComponent} from "../function-details/hira-table/hira-table.component";
import {ApiService} from "../../../services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {StateService} from "../../../services/state.service";
import {AddEaiComponent} from "../function-details/add-eai/add-eai.component";
import {ArrTableComponent} from "../function-details/arr-table/arr-table.component";
import {DashboardTableComponent} from "./dashboard-table/dashboard-table.component";

@Component({
  selector: 'app-inner-dashboard',
  templateUrl: './inner-dashboard.component.html',
  styleUrls: ['./inner-dashboard.component.scss']
})
export class InnerDashboardComponent{
  @ViewChild(UserTableComponent) hira!: HiraTableComponent;

  params: any = [];
  selectedPlant?: string;
  key?: string;
  selectedDepartment?: string;
  selectedYear?: string;
  userState: any;
  currentYear = new Date().getFullYear();
  dashboardData?: any;

  constructor(private dialog: MatDialog, private apiService: ApiService, private stateService: StateService,) {
  }

  ngOnInit() {
    this.apiService.filterDashboard(
      this.getCurrentParam()).subscribe(res=> {
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

  filterDashboard() {
    let params = {
      plant: this.selectedPlant,
      department: this.selectedDepartment,
      year: this.selectedYear
    }

    this.apiService.filterDashboard(params).subscribe(res=> {
      this.dashboardData = res;
    })
  }

  clearFilters() {
    this.selectedDepartment = "null";
    this.selectedPlant = "null";
    this.selectedYear = "null";
    let params = {
      plant: this.selectedPlant,
      department: this.selectedDepartment,
      year: this.selectedYear
    }
    this.apiService.filterDashboard(params).subscribe(res=> {
      this.dashboardData = res;
    })
  }


  generateReport(type: string) {
    let params = {
      plant: this.selectedPlant,
      department: this.selectedDepartment,
      year: this.selectedYear,
      type: type
    }

    this.apiService.generateReport(params).subscribe(response=> {
      this.downloadFile(response, type);
    })
  }

  private downloadFile(blob: Blob, type: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_report.xlsx`;
    a.click();
  }

  openTable(key: string) {
    let dashboardData =
      (key == 'HIRA' ? this.dashboardData?.functional_data?.hira :
        key=='EAI' ? this.dashboardData?.functional_data?.eai : this.dashboardData?.functional_data?.arr)

    this.dialog.open(DashboardTableComponent, {
      data: {
        dashboardData: dashboardData,
        key: key
      },
      minWidth: '90vh'
    });
  }
}
