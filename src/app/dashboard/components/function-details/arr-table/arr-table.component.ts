import {Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";
import {StateService} from "../../../../services/state.service";
import {Role} from "../../../../model/interfaces";

@Component({
  selector: 'app-arr-table',
  templateUrl: './arr-table.component.html',
  styleUrls: ['./arr-table.component.scss']
})
export class ArrTableComponent {
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
    this.apiService.getAssetRiskFromState();
    this.stateService.stateChanged.subscribe(state => {
      if (state.arrList) {
        this.userList = state.arrList;
        if (this.userList?.length > 0) {
          this.displayedColumns = Object.keys(this.userList[0]).filter(key => !(
            ['address', 'unit', 'doc_number',
              'existing_control', 'further_action_required', 'gross_ranking_value',
              'residual_likelihood', 'residual_impact', 'residual_ranking_value',
              'created_at', 'updated_at', 'year', 'asset_id', 'date', 'continues_update',
               'gross_likelihood', 'user_id',
              'gross_impact', 'risks'].includes(key)));
          this.dataSource = new MatTableDataSource<Role>(this.userList);
        }
      }
    });
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
