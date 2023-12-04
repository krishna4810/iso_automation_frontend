import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {debounceTime, distinctUntilChanged, filter, switchMap, takeUntil} from 'rxjs/operators';
import {Role, UserData} from "../../../../model/interfaces";
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BlService} from "../../../../services/bl.service";
import {StateService} from "../../../../services/state.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userRoles?: Role[];
  isNotSamePlant: boolean = true;
  private destroy$ = new Subject<void>();
  userState: any;
  employeeForm: FormGroup = this.formBuilder.group({
    UserId: ['', Validators.required],
    Name: [{value: '', disabled: true}],
    Email: [{value: '', disabled: true}],
    Designation: [{value: '', disabled: true}],
    Department: [{value: '', disabled: true}],
    Plant: [{value: '', disabled: true}],
    Unit: [{value: '', disabled: true}],
    Division: [{value: '', disabled: true}],
    Grade: [{value: '', disabled: true}],
    UserName: [{value: '', disabled: true}],
    UserRole: [{value: '', disabled: false}, Validators.required],
  });

  // @ts-ignore
  constructor(
    private blService: BlService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private stateService: StateService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isFromEdit: boolean, userData?: any, isFromCreator?: boolean }
  ) {
  }

  async ngOnInit() {
    this.getLoggedInUserData();
    try {
      const res = await this.apiService.getPermissions().toPromise();
      if (this.data?.isFromCreator) {
        this.userRoles = this.data?.isFromEdit  ?
          res?.filter(key => ([1,3].includes(key.id))) : res?.filter(key => ([3].includes(key.id)));
      } else {
        this.userRoles = res;
      }

      if (this.data?.isFromEdit) {
        await this.patchEditData();
      } else {
        this.initializeForm();
      }
    } catch (error) {
    }
  }

  getLoggedInUserData() {
    this.apiService.getLoggedInUserDataWithRoles(sessionStorage.getItem('username'));
    this.stateService?.stateChanged.subscribe(state => {
      this.userState = state?.loggedInUserData;
    })
  }

  async patchEditData() {
    let roleName: any = this.userRoles?.find(option => option.id == +this.data.userData.role_id);
    this.employeeForm.get('UserId')?.disable();
    this.employeeForm.patchValue({
      UserId: this.data.userData?.UserId,
      Name: this.data.userData?.Name,
      Email: this.data.userData?.Email,
      Designation: this.data.userData?.Designation,
      Department: this.data.userData?.Department,
      Plant: this.data.userData?.Plant,
      Unit: this.data.userData?.Unit,
      Division: this.data.userData?.Division,
      Grade: this.data.userData?.Grade,
      UserName: this.data.userData?.UserName,
      UserRole: roleName.id
    });
    this.isNotSamePlant = false;
  }


  initializeForm() {
    // @ts-ignore
    this.employeeForm.get('UserId')?.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(1000),
      filter((value) => !!value), // Filter out empty values
      switchMap((value) => this.apiService.getUserData(value)),
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {
        if (response == null) {
          this.blService.openSnackBar("No employee found");
          this.employeeForm.invalid;
        } else {
          this.checkSameEmployee(response);
          this.employeeForm.patchValue(response);
        }
      },
      (error) => {
        this.blService.openSnackBar("Failed to load employee Data");
      }
    );
  }

  checkSameEmployee(formData: any) {
    if(this.userState?.userData?.UserId == formData.UserId) {
      this.blService.openSnackBar("You cannot add or update your own self.");
    } else {
      this.data?.isFromCreator ? this.checkSamePlantOrNot(formData) : (this.isNotSamePlant = false);
    }
  }
  checkSamePlantOrNot(formData: any){
    if(this.userState?.userData?.Plant == 'Corporate Office') {
      if(this.userState?.userData?.Plant == formData.Plant &&
        this.userState?.userData?.Department == formData.Department) {
        this.isNotSamePlant = false;
      } else {
        this.isNotSamePlant = true;
        this.blService.openSnackBar('You and Creator are not of same plant or department')
      }
    } else {
      if(this.userState?.userData?.Plant == formData.Plant) {
        this.isNotSamePlant = false;
      } else {
        this.isNotSamePlant = true;
        this.blService.openSnackBar('You and Creator are not of same plant')
      }
    }
  }

  onSubmit() {
    this.apiService.addUserWithRole(this.employeeForm.get('UserName')?.value,
      this.employeeForm.get('UserRole')?.value, this.userState?.userData?.UserId)
      .subscribe(res => {
        this.blService.openSnackBar(res.message);
        this.apiService.getUsers(this.data?.isFromCreator, this.userState?.userData?.UserId);
      })
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
