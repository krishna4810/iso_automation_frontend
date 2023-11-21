import {Component, ViewChild} from '@angular/core';
import {AddHiraComponent} from "./add-hira/add-hira.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../services/api.service";
import {StateService} from "../../../services/state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HiraTableComponent} from "./hira-table/hira-table.component";
import {AddEaiComponent} from "./add-eai/add-eai.component";
import {EaiTableComponent} from "./eai-table/eai-table.component";
import {AddArrRiskComponent} from "./add-arr-risk/add-arr-risk.component";
import {ArrTableComponent} from "./arr-table/arr-table.component";

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
  @ViewChild(ArrTableComponent) arrComponent!: ArrTableComponent;

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
      this.dialog.open(AddArrRiskComponent, {
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
    } else {
      this.arrComponent.applyFilter(event);
    }
  }
}
