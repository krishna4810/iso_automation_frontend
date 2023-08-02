import {Component, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddUserComponent} from "./add-user/add-user.component";
import {ApiService} from "../../../../services/api.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Role} from "../../../../model/interfaces";
import {StateService} from "../../../../services/state.service";
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  userList: any = [];
  displayedColumns: string[]=[];
  dataSource = new MatTableDataSource<any>([]);
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private apiService: ApiService, private stateService: StateService) {
  }

   async ngOnInit() {
    this.apiService.getUsers();
      this.stateService.stateChanged.subscribe(state => {
       if(state?.users) {
         this.userList = state?.users;
         this.displayedColumns = Object.keys(this.userList[0]).filter(key => !(
           ['role_id','Mobile', 'user_name', 'Grade', 'Unit',
             'created_at', 'updated_at', 'id', 'OfficePhone',
             'IPPhone', 'UserName'].includes(key)));
         this.dataSource = new MatTableDataSource<Role>(this.userList);
         this.dataSource.paginator = this.paginator;
         this.dataSource = new MatTableDataSource<Role>(this.userList);
         this.dataSource.paginator = this.paginator;
       }
     });
  }

  addUser() {
    this.dialog.open(AddUserComponent, {
      width: '600px',
    });
  }
}
