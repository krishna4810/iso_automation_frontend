import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HiraActivity, Role} from "../../../../model/interfaces";
import {StateService} from "../../../../services/state.service";
import {ApiService} from "../../../../services/api.service";
import {AddHiraComponent} from "../add-hira/add-hira.component";
import {MatDialog} from "@angular/material/dialog";
import {SharedApproveDialogComponent} from "../../shared-approve-dialog/shared-approve-dialog.component";
import {SharedRejectDialogComponent} from "../../shared-reject-dialog/shared-reject-dialog.component";
import {STATUS} from "../../../../model/constants";
import {CommentsComponent} from "../../comments/comments.component";
import {AddEaiComponent} from "../add-eai/add-eai.component";
import {AddRiskComponent} from "../add-arr-risk/add-risk/add-risk.component";

@Component({
  selector: 'app-view-function-details',
  templateUrl: './view-function-details.component.html',
  styleUrls: ['./view-function-details.component.scss']
})
export class ViewFunctionDetailsComponent {
  id: any = {};
  userState: any;
  // @ts-ignore
  functionalDetail: any | undefined;
  status = STATUS;
  isNullRisk?: boolean;
  functionalType?: string;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private stateService: StateService) {
  }

  ngOnInit(): void {
    this.stateService.stateChanged.subscribe(state => {
      this.userState = state.loggedInUserData
    });
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.apiService.getSpecificFunction(this.id);
      this.stateService.stateChanged.subscribe(state => {
        if (state?.singleFunction) {
          this.functionalDetail = state?.singleFunction?.find(funct => funct.id == this.id);
          // @ts-ignore
          this.id.includes('A') && (this.isNullRisk = this.functionalDetail?.risks.some(risk => risk.gross_likelihood === null));
        }
      });
    });
  }

  editHira(functionalDetail: any) {
    const componentToOpen = this.id.includes('H') ? AddHiraComponent : this.id.includes('E') ? AddEaiComponent : AddRiskComponent;
    this.dialog.open<any, { isFromEdit: boolean; formData: HiraActivity | undefined }>(componentToOpen, {
      data: {
        isFromEdit: true,
        formData: functionalDetail,
      },
      maxHeight: '90vh'
    });
  }


  openApproveDialog(data: any, isRisk?: boolean) {
    this.dialog.open(SharedApproveDialogComponent, {
      data: {
        formData: data,
        role_id: this.userState?.role?.id,
        isRisk: isRisk
      }
    });
  }

  openRejectDialog(data: any, isRisk?: boolean) {
    this.dialog.open(SharedRejectDialogComponent, {
      data: {
        formData: data,
        role_id: this.userState?.role?.id,
        isRisk: isRisk
      },
      maxWidth: '900px'
    });
  }

  viewComment(id: any, isRisk?: boolean) {
    this.dialog.open(CommentsComponent, {
      data: {
        id: id,
        isRisk: isRisk
      },
      maxHeight: '90vh'
    });
  }

  addRisk() {
    this.dialog.open(AddRiskComponent, {
      data: {
        formData: this.functionalDetail
      },
      maxHeight: '90vh',
      minWidth: '150vh'
    });
  }


}
