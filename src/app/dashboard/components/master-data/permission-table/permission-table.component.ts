import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Role} from "../../../../model/interfaces";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../../services/api.service";
import {StateService} from "../../../../services/state.service";
import {MatPaginator} from "@angular/material/paginator";
import {AddUserComponent} from "../add-user/add-user.component";
import {BlService} from "../../../../services/bl.service";

@Component({
  selector: 'app-permission-table',
  templateUrl: './permission-table.component.html',
  styleUrls: ['./permission-table.component.scss']
})
export class PermissionTableComponent {
  displayedColumns: string[] = [];
  permissionList: any = [];
  dataSource = new MatTableDataSource<Role>([]);

  constructor(private blService: BlService, private dialog: MatDialog, private apiService: ApiService, private stateService: StateService) {
  }

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getPermissionData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  getPermissionData() {
    this.apiService.getPermissions().subscribe((permissions: Role[]) => {
      this.permissionList = permissions;
      this.displayedColumns = Object.keys(this.permissionList[0]).filter(key => key !== 'created_at' && key !== 'updated_at' && key !== 'id' && key !== 'dashboard');
      this.dataSource = new MatTableDataSource<Role>(this.permissionList);
    });
  }

  updatePermission() {
    this.apiService.updatePermission(this.permissionList).subscribe(res => {
      this.blService.openSnackBar(res.message);
    });
  }

}
