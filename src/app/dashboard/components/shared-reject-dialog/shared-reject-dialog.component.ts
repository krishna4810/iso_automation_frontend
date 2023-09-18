import {Component, Inject} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {STATUS} from "../../../model/constants";
import {Router} from "@angular/router";
import {BlService} from "../../../services/bl.service";
import {StateService} from "../../../services/state.service";

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
  constructor(private stateService: StateService, private router: Router, private apiService: ApiService, private blservice: BlService,
              @Inject(MAT_DIALOG_DATA) public data: {formData: any, role_id: any}) {
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
      this.roleStatus = this.status[6];
    }
    this.addComment();
  }
  addComment() {
    let commentPayload = {
      function_id: this.data.formData.id,
      user_id: this.userState.userData.UserId,
      comment: this.rejectionComments,
    }
    let hiraPayload = {
      status: this.roleStatus,
      id: this.data.formData.id
    }
    this.apiService.addComment(commentPayload).subscribe(res => {
      this.apiService.hiraStatusChange(hiraPayload).subscribe(res => {
        this.apiService.getHira();
        this.blservice.openSnackBar(res.message);
        this.router.navigate(['/home', 'functionalDetails']);
      })
    })

  }
}
