import {Component} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FUNCTION_RATING_DETAILS, STATUS} from "../../../../model/constants";
import {ApiService} from "../../../../services/api.service";
import {StateService} from "../../../../services/state.service";
import {FunctionRanking, LoggedInUserData} from "../../../../model/interfaces";
import {DatePipe} from "@angular/common";
import {BlService} from "../../../../services/bl.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-arr-risk',
  templateUrl: './add-arr-risk.component.html',
  styleUrls: ['./add-arr-risk.component.scss']
})
export class AddArrRiskComponent {

  currentDate: Date = new Date();
  userState: any;
  stepperOrientation: Observable<StepperOrientation>;
  loggedInData?: LoggedInUserData;
  formattedDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
  ranking: FunctionRanking[] = FUNCTION_RATING_DETAILS;

  constructor(private _formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private blService: BlService,
              public dialogRef: MatDialogRef<AddArrRiskComponent>,
              breakpointObserver: BreakpointObserver,
              private stateService: StateService,
              private apiService: ApiService,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

  }

  firstFormGroup = this._formBuilder.group({
    plant: [{value: '', disabled: true}],
    department: [{value: '', disabled: true}],
    unit: [{value: '', disabled: true}],
    docNumber: [{value: '', disabled: true}],
    date: [{value: '', disabled: true}],
    address: [{value: '', disabled: true}]
  });

  secondFormGroup = this._formBuilder.group({
    assetNumber: ['', Validators.required],
    assetName: ['', Validators.required],
    installationDate: [undefined, Validators.required],
    make: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    risk: this._formBuilder.array([])
  });

  ngOnInit() {
    this.stateService.stateChanged.subscribe((state) => {
      this.userState = state.loggedInUserData
    });
    this.patchAddHiraData();
  }

  patchAddHiraData() {
    this.apiService.getLoggedInUserDataWithRoles(sessionStorage.getItem('username'));
    this.stateService?.stateChanged.subscribe(state => {
      this.loggedInData = state?.loggedInUserData;
      this.mapFirstFormData(this.loggedInData);
    })
  }

  async mapFirstFormData(loggedInData: LoggedInUserData) {
    if (loggedInData?.userData?.Department != undefined) {
      await this.mapFormData(loggedInData);
      await this.getDocumentNumber();
    }
  }

  mapFormData(loggedInData: LoggedInUserData) {
    this.firstFormGroup.get('date')?.setValue(this.formattedDate);
    this.firstFormGroup?.get('plant')?.setValue(loggedInData?.userData?.Plant);
    this.firstFormGroup?.get('department')?.setValue(loggedInData?.userData?.Department);
    this.firstFormGroup?.get('address')?.setValue(loggedInData?.userData?.Plant);
    this.firstFormGroup?.get('unit')?.setValue(loggedInData?.userData?.Division);
  }

  getDocumentNumber() {
    const document = {
      year: this.firstFormGroup.get('date')?.value?.split('/')[2],
      unit: this.firstFormGroup.get('unit')?.value,
      department: this.firstFormGroup.get('department')?.value,
      plant: this.firstFormGroup.get('plant')?.value
    }

    this.apiService.getARRDocumentNumber(document).subscribe(res => {
      this.firstFormGroup.get('docNumber')?.setValue(res.documentNumber);
    });
  }

  addAssetDetails() {
    if (this.secondFormGroup?.invalid) {
      this.secondFormGroup.markAllAsTouched();
    } else {
      let installationDate = this.datePipe.transform(this.secondFormGroup?.get('installationDate')?.value, 'dd/MM/yyyy');
      let payload = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        installation_date: installationDate,
        userID: this.userState?.userData?.UserId,
        creatorName: this.userState?.userData?.Name,
        // @ts-ignore
        year: installationDate.split('/')[2],
      }
      this.apiService.addAssetDetails(payload).subscribe(res => {
        this.blService.openSnackBar(res.message);
        this.apiService.getAssetRiskFromState();
        this.dialogRef.close();
      })
    }
  }
}
