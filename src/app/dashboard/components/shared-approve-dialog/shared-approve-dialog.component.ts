import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {STATUS} from "../../../model/constants";
import {ApiService} from "../../../services/api.service";
import {BlService} from "../../../services/bl.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shared-approve-dialog',
  templateUrl: './shared-approve-dialog.component.html',
  styleUrls: ['./shared-approve-dialog.component.scss']
})
export class SharedApproveDialogComponent {
  roleStatus?: string;
  status: string[] = STATUS;
  constructor(private router: Router, private apiService: ApiService, private blservice: BlService,
    @Inject(MAT_DIALOG_DATA) public data: {formData: any, role_id: any}) {}

  approve() {
    if (this.data.role_id == 4) {
      this.roleStatus = this.status[2];
    } else if (this.data.role_id == 5) {
      this.roleStatus = this.status[4];
    } else if (this.data.role_id == 6) {
      this.roleStatus = this.status[5];
    } else if (this.data.role_id == 7 && this.data.formData.residual_ranking == null) {
      this.roleStatus = this.status[7];
    }
    else if (this.data.role_id == 7 && this.data.formData.residual_ranking != null) {
      this.roleStatus = this.status[8];
    }

    this.callStatusChangeAPI();
  }
  callStatusChangeAPI() {
    let payload = {
      status: this.roleStatus,
      id: this.data.formData.id
    }
    this.apiService.hiraStatusChange(payload).subscribe( res => {
      this.apiService.getHira();
      this.blservice.openSnackBar(res.message);
      this.router.navigate(['/home', 'functionalDetails']);
    });
  }
}
