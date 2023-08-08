import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../services/api.service";
import {StateService} from "../../../services/state.service";
import {Role} from "../../../model/interfaces";
import {AddUserComponent} from "./add-user/add-user.component";
import {BlService} from "../../../services/bl.service";

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent {

  userList: any = [];
  userDisplayedColumns: string[]=[];
  userDataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];
  permissionList: Role[] = [];
  dataSource = new MatTableDataSource<Role>([]);
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private blService: BlService,
              private apiService: ApiService, private stateService: StateService) {
  }

  async ngOnInit() {
    await this.getUserData();
    await this.getPermissionData();
  }

  getUserData() {
    this.apiService.getUsers();
    this.stateService.stateChanged.subscribe(state => {
      if(state?.users) {
        this.userList = state?.users;
        this.userDisplayedColumns = Object.keys(this.userList[0]).filter(key => !(
          ['role_id','Mobile', 'user_name', 'Grade', 'Unit',
            'created_at', 'updated_at', 'id', 'OfficePhone',
            'IPPhone', 'UserName'].includes(key)));
        this.userDataSource = new MatTableDataSource<Role>(this.userList);
        this.userDataSource.paginator = this.paginator;
        this.userDataSource = new MatTableDataSource<Role>(this.userList);
        this.userDataSource.paginator = this.paginator;
      }
    });
  }

  getPermissionData() {
    this.apiService.getPermissions().subscribe((permissions: Role[]) => {
      this.permissionList = permissions;
      this.displayedColumns = Object.keys(this.permissionList[0]).filter(key => key !== 'created_at' && key !== 'updated_at' && key !== 'id' && key !== 'dashboard');
      this.dataSource = new MatTableDataSource<Role>(this.permissionList);
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<Role>(this.permissionList);
      this.dataSource.paginator = this.paginator;
    });
  }

  updatePermission() {
    this.apiService.updatePermission(this.permissionList).subscribe(res => {
      this.blService.openSnackBar(res.message);
    });
  }

  addUser() {
    this.dialog.open(AddUserComponent, {
      width: '600px',
    });
  }
}
