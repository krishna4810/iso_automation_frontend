import {Component, ViewChild} from '@angular/core';
import {AddHiraComponent} from "./add-hira/add-hira.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ApiService} from "../../../services/api.service";
import {StateService} from "../../../services/state.service";
import {Role, Status} from "../../../model/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {STATUS} from "../../../model/constants";

@Component({
  selector: 'app-function-details',
  templateUrl: './function-details.component.html',
  styleUrls: ['./function-details.component.scss']
})
export class FunctionDetailsComponent {
  selectedTabIndex: number = 0;
  hiraList: any[] | undefined = [];
  displayedColumns: string[] = [];
  userState: any;
  dataSource = new MatTableDataSource<any>([]);
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private stateService: StateService) {
  }
  async ngOnInit() {
    this.stateService.stateChanged.subscribe(state => { debugger
      this.userState = state.loggedInUserData
    });
      this.apiService.getHira();
    this.stateService.stateChanged.subscribe(state => {
      if(state?.hiraList) {
        this.hiraList = state?.hiraList;
        // @ts-ignore
        this.displayedColumns = Object.keys(this.hiraList[0]).filter(key => !(
          ['address','unit', 'doc_number',
            'routine_activity', 'workers_involved', 'gross_ranking_value',
            'residual_likelihood', 'residual_impact', 'residual_ranking_value',
            'created_at', 'updated_at', 'year', 'further_action_required', 'mitigation_measures',
            'sub_activity_name','gross_likelihood', 'user_id',
            'gross_impact', 'existing_control', 'completion_date',
            'start_date'].includes(key)));
        this.dataSource = new MatTableDataSource<Role>(this.hiraList);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  openFunctionalComponent() {
    if (this.selectedTabIndex == 0) {
      this.dialog.open(AddHiraComponent, {
        data: {
          isFromEdit: false,
        },
        maxHeight: '90vh'
      });
    } else if (this.selectedTabIndex == 1) {
      console.log(this.selectedTabIndex)
    } else {
      console.log(this.selectedTabIndex)
    }
  }

  viewHira(event: any) {
    this.router.navigate(['../', 'functionalDetails', event.id], {
      relativeTo: this.route,
      queryParams: event.id,
    });
  }
}
