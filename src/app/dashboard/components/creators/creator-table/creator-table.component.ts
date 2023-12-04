import {Component, Input, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../services/api.service";
import {StateService} from "../../../../services/state.service";
import {AddUserComponent} from "../../master-data/add-user/add-user.component";

@Component({
  selector: 'app-creator-table',
  templateUrl: './creator-table.component.html',
  styleUrls: ['./creator-table.component.scss']
})
export class CreatorTableComponent {

  creatorId?: number;

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
    private apiService: ApiService,
    private stateService: StateService
  ) {
    this.apiService.getLoggedInUserDataWithRoles(sessionStorage.getItem('username'));
    this.stateService?.stateChanged.subscribe(state => {
      this.creatorId = state?.loggedInUserData?.userData.UserId;
    });
    this.apiService.getUsers(true, this.creatorId);
    this.stateService.stateChanged.subscribe(state => {
      if (state.creators) {
        this.userList = state.creators;
        this.displayedColumns = Object.keys(this.userList[0]).filter((key) =>
          ![
            'role_id',
            'Mobile',
            'user_name',
            'Grade',
            'Unit',
            'created_at',
            'updated_at',
            'id',
            'OfficePhone',
            'IPPhone',
            'UserName',
          ].includes(key)
        );
        this.dataSource = new MatTableDataSource<any>(this.userList);
      }
    });
  }

  viewUserDetail(event: any) {
    this.dialog.open(AddUserComponent, {
      data: {
        isFromEdit: true,
        userData: event,
        isFromCreator: true,
      },
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
