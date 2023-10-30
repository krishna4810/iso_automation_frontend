import {Component, ViewChild} from '@angular/core';
import {AddHiraComponent} from "./add-hira/add-hira.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ApiService} from "../../../services/api.service";
import {StateService} from "../../../services/state.service";
import {Role, Status} from "../../../model/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {UserTableComponent} from "../master-data/user-table/user-table.component";
import {HiraTableComponent} from "./hira-table/hira-table.component";
import {AddEaiComponent} from "./add-eai/add-eai.component";
import {EaiTableComponent} from "./eai-table/eai-table.component";
import {AddArrComponent} from "./add-arr/add-arr.component";

@Component({
  selector: 'app-function-details',
  templateUrl: './function-details.component.html',
  styleUrls: ['./function-details.component.scss']
})
export class FunctionDetailsComponent {
  selectedTabIndex: number = 0;
  userState: any;
  @ViewChild(HiraTableComponent) hiraComponent!: HiraTableComponent;
  @ViewChild(EaiTableComponent) eaiComponent!: EaiTableComponent;

  constructor(public dialog: MatDialog,
              private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private stateService: StateService) {
  }
  async ngOnInit() {
    this.stateService.stateChanged.subscribe(state => {
      this.userState = state.loggedInUserData
    });
    await this.apiService.getHira();
  }
  openFunctionalComponent() {
    if (this.selectedTabIndex == 0) {
      this.dialog.open(AddHiraComponent, {
        data: {
          isFromEdit: false,
        },
        maxHeight: '90vh'
      });
    } else if (this.selectedTabIndex == 1) {
      this.dialog.open(AddEaiComponent, {
        data: {
          isFromEdit: false,
        },
        maxHeight: '90vh'
      });
    } else {
      this.dialog.open(AddArrComponent, {
        data: {
          isFromEdit: false,
        },
        maxHeight: '90vh'
      });
    }
  }

  filterUser(event: Event){
    if (this.selectedTabIndex == 0) {
      this.hiraComponent.applyFilter(event);
    }
    else if (this.selectedTabIndex == 1) {
      this.eaiComponent.applyFilter(event);
    }
  }
}
