import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../services/api.service";
import {StateService} from "../../../../services/state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../../../model/interfaces";

@Component({
  selector: 'app-eai-table',
  templateUrl: './eai-table.component.html',
  styleUrls: ['./eai-table.component.scss']
})

export class EaiTableComponent implements AfterViewInit {
  @ViewChild(MatSort) set contentSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set contentPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  displayedColumns: string[] = [];
  userList: any = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private stateService: StateService
  ) {
    this.apiService.getEai();
    this.stateService.stateChanged.subscribe(state => {
      if(state.eaiList) {
        this.userList = state.eaiList;
        if (this.userList?.length>0) {
          this.displayedColumns = Object.keys(this.userList[0]).filter(key => !(
            ['address','unit', 'doc_number',
              'routine_activity', 'workers_involved', 'gross_ranking_value',
              'residual_likelihood', 'residual_impact', 'residual_ranking_value',
              'created_at', 'updated_at', 'year', 'further_action_required', 'mitigation_measures',
              'sub_activity_name','gross_likelihood', 'user_id',
              'gross_impact', 'existing_control', 'completion_date',
              'start_date'].includes(key)));
          this.dataSource = new MatTableDataSource<Role>(this.userList);
        }
      }
    });
  }

  ngAfterViewInit() {
  }

  viewUserDetail(event: any) {
    this.router.navigate(['../', 'functionalDetails', event.id], {
      relativeTo: this.route,
      queryParams: event.id,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

