import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {debounceTime, distinctUntilChanged, filter, switchMap, takeUntil} from 'rxjs/operators';
import {Role, UserData} from "../../../../model/interfaces";
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BlService} from "../../../../services/bl.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
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
  userRoles: Role[] = [];
  private destroy$ = new Subject<void>();

  // @ts-ignore
  constructor(
    private blService: BlService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {isFromEdit: boolean, userData?: any}

  ) {
  }

  async ngOnInit() {
    await this.getUserRole();
    this.data?.isFromEdit ? this.patchEditData() : this.initializeForm();
  }

  async patchEditData(){
    console.log(this.userRoles);
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
    })
  }

  initializeForm () {
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
          this.employeeForm.setValue({
            UserId: '',
            Name: '',
            Email: '',
            Designation: '',
            Department: '',
            Plant: '',
            Unit: '',
            Division: '',
            Grade: '',
            UserRole: ''
          });
        } else {
          this.employeeForm.patchValue(response);
        }
      },
      (error) => {
        console.error('API call failed:', error);
        this.blService.openSnackBar("Failed to load employee Data");
      }
    );
  }

  getUserRole() {
    this.apiService.getPermissions().subscribe(res => {
      this.userRoles = res;
    })
  }

  onSubmit() {
    this.apiService.addUserWithRole(this.employeeForm.get('UserName')?.value,
      this.employeeForm.get('UserRole')?.value)
      .subscribe(res => {
      this.blService.openSnackBar(res.message);
      this.apiService.getUsers();
    })
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
