import {Component, ViewChild} from '@angular/core';
import {PermissionTableComponent} from "./permission-table/permission-table.component";
import {UserTableComponent} from "./user-table/user-table.component";

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent {

  @ViewChild('permissionTable') childComponent!: PermissionTableComponent;
  @ViewChild('usersTable') child!: UserTableComponent;

  updatePermissionInChild() {
    this.childComponent.updatePermission();
  }

  updateUserTable() {
    this.child.addUser();
  }
}
