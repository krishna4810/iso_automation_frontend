import {Component, ViewChild} from '@angular/core';
import {AddHiraComponent} from "./add-hira/add-hira.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ApiService} from "../../../services/api.service";
import {StateService} from "../../../services/state.service";
import {Role} from "../../../model/interfaces";

@Component({
  selector: 'app-function-details',
  templateUrl: './function-details.component.html',
  styleUrls: ['./function-details.component.scss']
})
export class FunctionDetailsComponent {
  selectedTabIndex: number = 0;
  hiraList: any[] | undefined = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private apiService: ApiService,
              private stateService: StateService) {
  }
  async ngOnInit() { debugger;
    this.apiService.getHira();
    this.stateService.stateChanged.subscribe(state => {
      if(state?.hiraList) {
        this.hiraList = state?.hiraList;
        // @ts-ignore
        this.displayedColumns = Object.keys(this.hiraList[0]).filter(key => !(
          ['address','unit',
            'routine_activity', 'workers_involved',
            'residual_likelihood', 'residual_impact',
            'created_at', 'updated_at', 'year',
            'sub_activity_name','gross_likelihood',
            'gross_impact', 'existing_control', 'completion_date',
            'start_date'].includes(key)));
        this.dataSource = new MatTableDataSource<Role>(this.hiraList);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  openFunctionalComponent() {
    if (this.selectedTabIndex == 0) {
      this.dialog.open(AddHiraComponent);
    } else if (this.selectedTabIndex == 1) {
      console.log(this.selectedTabIndex)
    } else {
      console.log(this.selectedTabIndex)
    }
  }

  editHira() {
    this.dialog.open(AddHiraComponent);
  }
}
