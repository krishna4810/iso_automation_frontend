import {Component, ViewChild} from '@angular/core';
import {PermissionTableComponent} from "../master-data/permission-table/permission-table.component";
import {HiraTableComponent} from "./hira-table/hira-table.component";
import {AddHiraComponent} from "./add-hira/add-hira.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-function-details',
  templateUrl: './function-details.component.html',
  styleUrls: ['./function-details.component.scss']
})
export class FunctionDetailsComponent {
  selectedTabIndex: number = 0;
  @ViewChild('hiraTable') hiraComponent!: HiraTableComponent;

  constructor(public dialog: MatDialog,) {
  }
  openFunctionalComponent() {
    if (this.selectedTabIndex == 0) {
      this.dialog.open(AddHiraComponent);
    } else if (this.selectedTabIndex == 1) {
      console.log(this.selectedTabIndex)
    } else {
      console.log(this.selectedTabIndex)
    }
  }
}
