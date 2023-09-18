import {Component, Input, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Role} from "../../../../model/interfaces";
import {ApiService} from "../../../../services/api.service";
import {StateService} from "../../../../services/state.service";
import {MatPaginator} from "@angular/material/paginator";
import {AddUserComponent} from "../add-user/add-user.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {

  displayedColumns: string[] = [];
  userList: any = [];
  dataSource = new MatTableDataSource<Role>([]);
  constructor(private dialog: MatDialog, private apiService: ApiService, private stateService: StateService) {
    this.getUserData();
  }
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Role>(this.userList);
    this.dataSource.paginator = this.paginator;
  }

  getUserData() {
    this.apiService.getUsers();
    this.stateService.stateChanged.subscribe(state => {
      if(state?.users) {
        this.userList = state?.users;
        this.displayedColumns = Object.keys(this.userList[0]).filter(key => !(
          ['role_id','Mobile', 'user_name', 'Grade', 'Unit',
            'created_at', 'updated_at', 'id', 'OfficePhone',
            'IPPhone', 'UserName'].includes(key)));
      }
    });
  }

  viewUserDetail(event: any) {
    this.dialog.open(AddUserComponent, {
      data: {
        isFromEdit: true,
        userData: event
      },
    });
  }
}
