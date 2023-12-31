import {Component, Inject} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {STATUS} from "../../../model/constants";
import {Router} from "@angular/router";
import {BlService} from "../../../services/bl.service";
import {StateService} from "../../../services/state.service";
import {SharedApproveDialogComponent} from "../shared-approve-dialog/shared-approve-dialog.component";

@Component({
  selector: 'app-shared-reject-dialog',
  templateUrl: './shared-reject-dialog.component.html',
  styleUrls: ['./shared-reject-dialog.component.scss']
})
export class SharedRejectDialogComponent {
  rejectionComments: any;
  roleStatus?: string;
  userState: any;
  status: string[] = STATUS;

  constructor(public dialogRef: MatDialogRef<SharedRejectDialogComponent>,
              private stateService: StateService, private router: Router, private apiService: ApiService, private blservice: BlService,
              @Inject(MAT_DIALOG_DATA) public data: { formData: any, role_id: any, isRisk?: boolean }) {
  }

  ngOnInit() {
    this.stateService.stateChanged.subscribe(state => {
      this.userState = state.loggedInUserData
    });
  }

  requestChange() {
    if (this.data.role_id == 4) {
      this.roleStatus = this.status[1];
    } else if (this.data.role_id == 5) {
      this.roleStatus = this.status[3];
    } else if (this.data.role_id == 7) {
      this.roleStatus = this.status[5];
    }
    this.addComment();
  }

  addComment() {
    let commentPayload = {
      function_id: !this.data?.isRisk ? this.data.formData.id : this.data.formData.risk_id,
      user_id: this.userState.userData.UserId,
      comment: this.rejectionComments,
    }
    let hiraPayload = {
      status: this.roleStatus,
      id: !this.data?.isRisk ? this.data.formData.id : this.data.formData.risk_id

    }
    this.apiService.addComment(commentPayload).subscribe(res => {
      this.apiService.hiraStatusChange(hiraPayload).subscribe(res => {
        this.blservice.openSnackBar(res.message);
        if (this.data?.isRisk) {
          this.apiService.getSpecificFunction(this.data?.formData?.asset_id);
        } else {
          this.router.navigate(['/home', 'dashboard']);
        }
      })
    })
    this.dialogRef.close();
  }
}
