import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../../../services/api.service';
import { Role } from '../../../../model/interfaces';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-permission-table',
  templateUrl: './permission-table.component.html',
  styleUrls: ['./permission-table.component.scss']
})
export class PermissionTableComponent implements OnInit {
  displayedColumns: string[] = [];
  permissionList: Role[] = [];
  dataSource = new MatTableDataSource<Role>([]);

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private snackBar: MatSnackBar, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPermissions().subscribe((permissions: Role[]) => {
      this.permissionList = permissions;
      this.displayedColumns = Object.keys(this.permissionList[0]).filter(key => key !== 'created_at' && key !== 'updated_at' && key !== 'id' && key !== 'dashboard');
      this.dataSource = new MatTableDataSource<Role>(this.permissionList);
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<Role>(this.permissionList);
      this.dataSource.paginator = this.paginator;
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  updatePermission() {
    this.apiService.updatePermission(this.permissionList).subscribe(res => {
      this.openSnackBar(res.message);
    });
  }
}
