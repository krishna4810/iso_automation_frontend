import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {StepperOrientation} from "@angular/cdk/stepper";
import {FunctionRanking, LoggedInUserData} from "../../../../model/interfaces";
import {FUNCTION_RATING_DETAILS, ROUTINE_ACTIVITY} from "../../../../model/constants";
import {BlService} from "../../../../services/bl.service";
import {MatSelectChange} from "@angular/material/select";
import {StateService} from "../../../../services/state.service";
import {ApiService} from "../../../../services/api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-hira',
  templateUrl: './add-hira.component.html',
  styleUrls: ['./add-hira.component.scss']
})
export class AddHiraComponent {
  currentDate: Date = new Date();
  formattedDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
  likelihood: number = 1;
  impact: number = 1;
  rankingData?: string
  ranking: FunctionRanking[] = FUNCTION_RATING_DETAILS;
  activities: any[] = ROUTINE_ACTIVITY;
  firstFormGroup = this._formBuilder.group({
    plant: [{value: '', disabled: true}],
    department: [{value: '', disabled: true}],
    unit: [{value: '', disabled: true}],
    docNumber: [{value: '', disabled: true}],
    date: [{value: '', disabled: true}],
    address: [{value: '', disabled: true}]
  });
  secondFormGroup = this._formBuilder.group({
    activityName: ['', Validators.required],
    subActivityName: ['', Validators.required],
    hazard: ['', Validators.required],
    startDate: ['', Validators.required],
    g_likelihood: ['', Validators.required],
    g_impact: ['', Validators.required],
    g_ranking: [{value: '', disabled: true}],
  });

  thirdFormGroup = this._formBuilder.group({
    existingControl: ['', Validators.required],
    mitigationMeasures: ['', Validators.required],
    furtherAction: ['', Validators.required],
    completionDate: ['', Validators.required],
    routineActivity: ['', Validators.required],
    workersInvolved: ['', Validators.required],
    r_likelihood: ['', Validators.required],
    r_impact: ['', Validators.required],
    r_ranking: [{value: '', disabled: true}],
  });

  stepperOrientation: Observable<StepperOrientation>;
  loggedInData?: LoggedInUserData;

  constructor(private blService: BlService,
              private datePipe: DatePipe,
              private apiService: ApiService,
              private stateService: StateService,
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddHiraComponent>,
              breakpointObserver: BreakpointObserver) {

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
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
    let date = this.firstFormGroup.get('date')?.value;
    let unit = this.firstFormGroup.get('unit')?.value;
    let department = this.firstFormGroup.get('department')?.value;
    let plant = this.firstFormGroup.get('plant')?.value;
    const document = {
      year: date?.split('/')[2],
      unit: unit,
      department: department,
      plant: plant
    }

    this.apiService.getDocumentNumber(document).subscribe(res => {
      this.firstFormGroup.get('docNumber')?.setValue(res.documentNumber);
    });
  }

  clearImpact($event: MatSelectChange) {
    this.likelihood = $event.value;
    this.secondFormGroup.get('g_impact')?.setValue('');
  }

  calculateRanking($event: MatSelectChange) {
    this.impact = $event.value;
    this.rankingData = this.blService.calculateRanking(this.likelihood, this.impact);
    this.secondFormGroup?.get('g_ranking')?.setValue(this.rankingData);
  }

  getRankingBackgroundColor() {
    if (this.rankingData === 'High') {
      return 'bg-red-500';
    } else if (this.rankingData === 'Medium')
      return 'bg-yellow-100';
    else if (this.rankingData === 'Low') {
      return 'bg-green-500';
    }
    return '';
  }

  addHira() {
    if (this.secondFormGroup.invalid) {
      this.secondFormGroup.markAllAsTouched();
      return;
    } else {
      this.secondFormGroup.enable();
      let date = this.secondFormGroup.get('startDate')?.value;
      let startDate = this.datePipe.transform(date, 'MM/dd/yyyy');
      let hiraPayload = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        start_date: startDate,
        // @ts-ignore
        year: startDate.split('/')[2]
      }
      this.secondFormGroup.disable();
      this.apiService.addHiraActivity(hiraPayload).subscribe(res => {
          this.blService.openSnackBar(res.message);
            this.apiService.getHira()
        }
      );
      this.dialogRef.close();
    }
  }

  checkValidity() {

  }
}


