import {Component} from '@angular/core';
import {AddUserComponent} from "../master-data/add-user/add-user.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../services/api.service";
import {StateService} from "../../../services/state.service";

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent {

  creatorId: string = '';
  constructor(private dialog: MatDialog, private apiService: ApiService,
              private stateService: StateService,) {
  }

  async ngOnInit() {
    this.getLoggedInUserData();
  }

  getLoggedInUserData() { debugger
    this.apiService.getLoggedInUserDataWithRoles(sessionStorage.getItem('username'));
    this.stateService?.stateChanged.subscribe(state => {
      this.creatorId = state?.loggedInUserData?.userData.UserId.toString();
    })
  }

  addUser() {
    this.dialog.open(AddUserComponent, {
      data: {
        isFromEdit: false,
      },
    });
  }
}
