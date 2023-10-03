import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { StateService } from '../../../../services/state.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements AfterViewInit {
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
    this.apiService.getUsers();
    this.stateService.stateChanged.subscribe(state => {
      if(state.users) {
        this.userList = state.users;
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

  ngAfterViewInit() {
  }

  viewUserDetail(event: any) {
    this.dialog.open(AddUserComponent, {
      data: {
        isFromEdit: true,
        userData: event,
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
