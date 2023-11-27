import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {StepperOrientation} from "@angular/cdk/stepper";
import {FunctionRanking, LoggedInUserData} from "../../../../model/interfaces";
import {
  HIRA_IMPACT,
  HIRA_LIKELIHOOD,
  ROUTINE_ACTIVITY,
  STATUS
} from "../../../../model/constants";
import {BlService} from "../../../../services/bl.service";
import {StateService} from "../../../../services/state.service";
import {ApiService} from "../../../../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-hira',
  templateUrl: './add-hira.component.html',
  styleUrls: ['./add-hira.component.scss']
})
export class AddHiraComponent {
  currentDate: Date = new Date();
  formattedDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
  grossRanking?: string
  residualRanking?: string
  residualRankingValue?: number;
  grossRankingValue?: number;
  userState: any;
  hiraLikelihood: FunctionRanking[] = HIRA_LIKELIHOOD;
  hiraImpact: FunctionRanking[] = HIRA_IMPACT;
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
    startDate: [undefined, Validators.required],
    g_impact: [undefined, Validators.required],
    g_likelihood: [undefined, Validators.required],
    g_ranking: [{value: undefined, disabled: true}],
  });

  thirdFormGroup = this._formBuilder.group({
    existingControl: ['', Validators.required],
    mitigationMeasures: ['', Validators.required],
    furtherAction: ['', Validators.required],
    completionDate: ['', Validators.required],
    routineActivity: ['', Validators.required],
    workersInvolved: ['', Validators.required],
    r_likelihood: [undefined, Validators.required],
    r_impact: [undefined, Validators.required],
    r_ranking: [{value: undefined, disabled: true}],
  });

  stepperOrientation: Observable<StepperOrientation>;
  loggedInData?: LoggedInUserData;
  status: string[] = STATUS;

  constructor(private blService: BlService,
              private datePipe: DatePipe,
              private apiService: ApiService,
              private stateService: StateService,
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddHiraComponent>,
              breakpointObserver: BreakpointObserver,
              @Inject(MAT_DIALOG_DATA) public data: {isFromEdit: boolean, formData?: any}
  ) {

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.stateService.stateChanged.subscribe((state) => {
      this.userState = state.loggedInUserData
    });
    this.data.isFromEdit ? this.editHira() : this.patchAddHiraData();
  }

  patchAddHiraData () {
    this.apiService.getLoggedInUserDataWithRoles(sessionStorage.getItem('username'));
    this.stateService?.stateChanged.subscribe(state => {
      this.loggedInData = state?.loggedInUserData;
      this.mapFirstFormData(this.loggedInData);
    })
  }
  editHira() {
    this.patchFirstFormData();
    this.patchSecondFormData();
    this.patchThirdFormData();
  }

  patchFirstFormData() {
    this.firstFormGroup.patchValue({
      plant: this.data.formData.plant,
      department: this.data.formData.department,
      unit: this.data.formData.unit,
      docNumber: this.data.formData.doc_number,
      date: this.data.formData.date,
      address: this.data.formData.address,
    });
  }
  patchSecondFormData() {
    let selectedGrossLikelihood: any = this.hiraLikelihood.find(option => option.value == +this.data.formData.gross_likelihood);
    let selectedGrossImpact: any = this.hiraImpact.find(option => option.value == +this.data.formData.gross_impact);
    this.secondFormGroup.patchValue({
      activityName: this.data.formData.activity_name,
      subActivityName: this.data.formData.sub_activity_name,
      hazard: this.data.formData.hazard,
      g_ranking: this.data.formData.gross_ranking,
      // @ts-ignore
      startDate: this.parseDate(this.data.formData.start_date),
      g_likelihood: selectedGrossLikelihood.value,
      g_impact: selectedGrossImpact.value,
    });
    this.grossRankingValue = this.data.formData.gross_ranking_value;
    this.grossRanking = this.data.formData.gross_ranking;
    if (this.data.formData.status == this.status[7]) {
      this.disableFormControls();
    }
  }
  patchThirdFormData() {
    let selectedResidualLikelihood: any = this.hiraLikelihood.find(option => option.value == +this.data.formData.residual_likelihood);
    let selectedResidualImpact: any = this.hiraImpact.find(option => option.value == +this.data.formData.residual_impact);
    this.thirdFormGroup.patchValue({
      existingControl: this.data.formData.existing_control,
      mitigationMeasures: this.data.formData.mitigation_measures,
      routineActivity: this.data.formData.routine_activity,
      workersInvolved: this.data.formData.workers_involved,
      furtherAction: this.data.formData.further_action_required,
      r_ranking: this.data.formData.residual_ranking,
      // @ts-ignore
      completionDate: this.parseDate(this.data.formData.completion_date),
      r_likelihood: selectedResidualLikelihood.value,
      r_impact: selectedResidualImpact.value,
    });
    this.residualRankingValue = this.data.formData.residual_ranking_value;
    this.residualRanking = this.data.formData.residual_ranking;
  }

  disableFormControls() {
    // Get all the control names from the form group
    const controlNames = Object.keys(this.secondFormGroup.controls);

    // Loop through each control name and disable the control
    controlNames.forEach((controlName) => {
      const control = this.secondFormGroup.get(controlName);
      control?.disable();
    });
  }

  parseDate(dateStr: string): Date {
    const parts = dateStr?.split('/');
    const day = parseInt(parts[0]!, 10);
    const month = parseInt(parts[1]!, 10) - 1;
    const year = parseInt(parts[2]!, 10);
    return new Date(year, month, day);
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

    this.apiService.getDocumentNumber(document).subscribe(res => {
      this.firstFormGroup.get('docNumber')?.setValue(res.documentNumber);
    });
  }

  clearGrossImpact(formControl: string) {
    if (formControl === 'gross') {
      this.secondFormGroup.get('g_impact')?.setValue(undefined);
    } else {
      this.thirdFormGroup.get('r_impact')?.setValue(undefined);
    }
  }

  calculateGrossRanking(formControl: string) {
    if (formControl === 'gross') {
      // @ts-ignore
      this.grossRankingValue = this.secondFormGroup.get('g_likelihood')?.value * this.secondFormGroup.get('g_impact')?.value;
      this.grossRanking = this.blService.calculateRanking(this.grossRankingValue);
      // @ts-ignore
      this.secondFormGroup?.get('g_ranking')?.setValue(this.grossRanking);
    } else {
      // @ts-ignore
      this.residualRankingValue = this.thirdFormGroup.get('r_likelihood')?.value * this.thirdFormGroup.get('r_impact')?.value;
      this.residualRanking = this.blService.calculateRanking(this.residualRankingValue);
      // @ts-ignore
      this.thirdFormGroup?.get('r_ranking')?.setValue(this.residualRanking);
    }
  }

  getRankingBackgroundColor() {
    if (this.grossRanking  === 'High') {
      return 'bg-red-500';
    } else if (this.grossRanking === 'Medium')
      return 'bg-yellow-200';
    else if (this.grossRanking === 'Low') {
      return 'bg-green-500';
    }
    return '';
  }

  getResidualRankingBackgroundColor() {
    if (this.residualRanking  === 'High') {
      return 'bg-red-500';
    } else if (this.residualRanking === 'Medium')
      return 'bg-yellow-200';
    else if (this.residualRanking === 'Low') {
      return 'bg-green-500';
    }
    return '';
  }

  addHira() {
    if (this.data?.formData?.status == this.status[7] && this.thirdFormGroup.invalid) {
      this.thirdFormGroup.markAllAsTouched();
    }
    else if (this.secondFormGroup.invalid) {
      this.secondFormGroup.markAllAsTouched();
      return;
    } else {
      this.secondFormGroup.enable();
      this.thirdFormGroup.enable();
      let startDate = this.datePipe.transform(this.secondFormGroup.get('startDate')?.value, 'dd/MM/yyyy');
      let completionDate = this.datePipe.transform(this.thirdFormGroup.get('completionDate')?.value, 'dd/MM/yyyy');
      let hiraPayload = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
        start_date: startDate,
        completion_date: completionDate,
        residualRankingValue: this.residualRankingValue,
        grossRankingValue: this.grossRankingValue,
        userID: this.userState.userData.UserId,
        creatorName: this.data?.isFromEdit ? this.data.formData.creator_name : this.userState.userData.Name,
        // @ts-ignore
        year: startDate.split('/')[2],
        currentUser: this.userState.userData.Name,
        status: this.data?.isFromEdit ?
          (this.data?.formData?.status ===
          this.status[1] || this.data?.formData?.status === this.status[3] ||
          this.data?.formData?.status === this.status[6] ||
          this.data?.formData?.status === this.status[7] ?
            this.status[0] : this.data?.formData?.status ) : this.status[0]
      }
      this.secondFormGroup.disable();
      this.thirdFormGroup.disable();
      this.apiService.addHiraActivity(hiraPayload).subscribe(res => {
          this.blService.openSnackBar(res.message);
          this.data?.isFromEdit ? this.apiService.getSpecificFunction(this.data?.formData?.id) : this.apiService.getHira();
        }
      );
      this.dialogRef.close();
    }
  }
}


