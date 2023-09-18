import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../services/api.service";
import {StateService} from "../../../services/state.service";
import {Role} from "../../../model/interfaces";
import {AddUserComponent} from "./add-user/add-user.component";
import {BlService} from "../../../services/bl.service";
import {debounceTime, distinctUntilChanged, filter, switchMap, takeUntil} from "rxjs/operators";
import {FormBuilder, FormControl} from "@angular/forms";
import {Subject} from "rxjs";
import {PermissionTableComponent} from "./permission-table/permission-table.component";

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent {

  // @ts-ignore
  @ViewChild(PermissionTableComponent) permissionComponent: PermissionTableComponent;

  constructor(private dialog: MatDialog, private _formBuilder: FormBuilder,) {
  }
  userList: any = [];
  searchFormGroup = this._formBuilder.group({
    search: undefined,
  });
  private destroy$ = new Subject<void>();
  // @ts-ignore

  async ngOnInit() {
  }


  addUser() {
    this.dialog.open(AddUserComponent, {
      data: {
        isFromEdit: false,
      },
    });
  }



  // searchUser () {
  //   // @ts-ignore
  //   this.searchFormGroup.get('search')?.valueChanges.pipe(
  //     distinctUntilChanged(),
  //     debounceTime(1000),
  //     filter((value) => !!value),
  //     takeUntil(this.destroy$),
  //     switchMap((value) => this.filterUserData(value)),
  //   ).subscribe((res)=> {
  //     this.userDataSource = new MatTableDataSource<Role>(res);
  //
  //   });
  // }
  //
  // filterUserData(data: any){
  //   return this.userDataSource.filteredData.filter(user => user.UserId == +data)
  // }
  updatePermission() {
    this.permissionComponent.updatePermission();
  }
}
