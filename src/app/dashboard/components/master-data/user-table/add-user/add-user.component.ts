import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {debounceTime, distinctUntilChanged, filter, switchMap, takeUntil} from 'rxjs/operators';
import {Role} from "../../../../../model/interfaces";
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BlService} from "../../../../../services/bl.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  employeeForm!: FormGroup;
  userRoles: Role[] = [];
  private destroy$ = new Subject<void>();

  // @ts-ignore
  constructor(
    private blService: BlService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) {
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
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
    this.getUserRole();
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
