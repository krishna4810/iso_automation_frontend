import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HiraActivity, Role} from "../../../../model/interfaces";
import {StateService} from "../../../../services/state.service";
import {ApiService} from "../../../../services/api.service";
import {AddHiraComponent} from "../add-hira/add-hira.component";
import {MatDialog} from "@angular/material/dialog";
import {SharedApproveDialogComponent} from "../../shared-approve-dialog/shared-approve-dialog.component";
import {SharedRejectDialogComponent} from "../../shared-reject-dialog/shared-reject-dialog.component";

@Component({
  selector: 'app-view-function-details',
  templateUrl: './view-function-details.component.html',
  styleUrls: ['./view-function-details.component.scss']
})
export class ViewFunctionDetailsComponent {
  id: any = {};
  userState: any;
  // @ts-ignore
  functionalDetail: HiraActivity | undefined;
  constructor( private apiService: ApiService,
               private route: ActivatedRoute,
               public dialog: MatDialog,
               private stateService: StateService) {
  }

  ngOnInit(): void {
    this.stateService.stateChanged.subscribe(state => { debugger
      this.userState = state.loggedInUserData
    });
    this.apiService.getHira();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getFunctionDetail();
    });
  }
  getFunctionDetail() {
    this.stateService.stateChanged.subscribe(state => {
      if(state?.hiraList) {
        this.functionalDetail = state?.hiraList?.find(hira => hira.id == this.id);
      }
    });
  }

  editHira(functionalDetail: HiraActivity | undefined) {
    this.dialog.open(AddHiraComponent, {
      data: {
        isFromEdit: true,
        formData: functionalDetail
      },
      maxHeight: '90vh'
    });
  }

  openApproveDialog(data: any) {
    this.dialog.open(SharedApproveDialogComponent, {
      data: {
        formData: data
      }
    });
  }

  openRejectDialog(data: any) {
    this.dialog.open(SharedRejectDialogComponent, {
      data: {
        formData: data
      },
      maxWidth: '900px'
    });
  }
}
