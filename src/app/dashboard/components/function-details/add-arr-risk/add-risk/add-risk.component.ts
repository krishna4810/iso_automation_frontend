import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {FunctionRanking} from "../../../../../model/interfaces";
import {FUNCTION_RATING_DETAILS, STATUS} from "../../../../../model/constants";
import {BlService} from "../../../../../services/bl.service";
import {ApiService} from "../../../../../services/api.service";
import {StateService} from "../../../../../services/state.service";

@Component({
  selector: 'app-add-risk',
  templateUrl: './add-risk.component.html',
  styleUrls: ['./add-risk.component.scss']
})
export class AddRiskComponent {

  ranking: FunctionRanking[] = FUNCTION_RATING_DETAILS;
  grossRanking?: string
  residualRanking?: string
  residualRankingValue?: number;
  grossRankingValue?: number;
  status: string[] = STATUS;

  riskForm = this._formBuilder.group({
    riskStatement: ['', Validators.required],
    grossLikelihood: [undefined, Validators.required],
    grossImpact: [undefined, Validators.required],
    grossRanking: [undefined, Validators.required],
    residualLikelihood: [undefined, Validators.required],
    residualImpact: [undefined, Validators.required],
    residualRanking: [undefined, Validators.required],
    furtherAction: ['', Validators.required],
    existingControl: ['', Validators.required],
  });

  userState: any;

  constructor(private _formBuilder: FormBuilder,
              private blService: BlService,
              private apiService: ApiService,
              private stateService: StateService,
              public dialogRef: MatDialogRef<AddRiskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { formData?: any, isFromEdit?: boolean}) {
  }

  ngOnInit() {
    console.log(this.data.formData);
    this.stateService.stateChanged.subscribe((state) => {
      this.userState = state.loggedInUserData
    });
    this.data.isFromEdit && this.editData();
  }

  editData() {
    let selectedGrossLikelihood: any = this.ranking.find(option => option.value == +this.data?.formData?.gross_likelihood);
    let selectedGrossImpact: any = this.ranking.find(option => option.value == +this.data?.formData.gross_impact);
    let selectedResidualLikelihood: any = this.ranking.find(option => option.value == +this.data?.formData.residual_likelihood);
    let selectedResidualImpact: any = this.ranking.find(option => option.value == +this.data?.formData.residual_impact);

    this.riskForm.patchValue({
      riskStatement: this.data.formData.risk_statement,
      grossLikelihood: selectedGrossLikelihood.value,
      grossImpact: selectedGrossImpact.value,
      grossRanking: this.data.formData.gross_ranking,
      residualLikelihood: selectedResidualLikelihood.value,
      residualImpact: selectedResidualImpact.value,
      residualRanking: this.data.formData.residual_ranking,
      furtherAction: this.data.formData.further_action_required,
      existingControl: this.data.formData.existing_control,
    });
    this.grossRankingValue = this.data.formData.gross_ranking_value;
    this.grossRanking = this.data.formData.gross_ranking;
    this.residualRankingValue = this.data.formData.residual_ranking_value;
    this.residualRanking = this.data.formData.residual_ranking;
  }

  clearGrossImpact(formControl: string) {
    if (formControl === 'gross') {
      // @ts-ignore
      this.riskForm.get('grossImpact')?.setValue(undefined);
    } else {
      // @ts-ignore
      this.riskForm.get('residualImpact')?.setValue(undefined);
    }
  }

  calculateGrossRanking(formControl: string) {
    if (formControl === 'gross') {
      // @ts-ignore
      this.grossRankingValue = this.riskForm.get('grossLikelihood')?.value * this.riskForm.get('grossImpact')?.value;
      this.grossRanking = this.blService.calculateRanking(this.grossRankingValue);
      // @ts-ignore
      this.riskForm?.get('grossRanking')?.setValue(this.grossRanking);
    } else {
      // @ts-ignore
      this.residualRankingValue = this.riskForm.get('residualLikelihood')?.value * this.riskForm.get('residualImpact')?.value;
      this.residualRanking = this.blService.calculateRanking(this.residualRankingValue);
      // @ts-ignore
      this.riskForm?.get('residualRanking')?.setValue(this.residualRanking);
    }
  }

  getRankingBackgroundColor() {
    if (this.grossRanking === 'High') {
      return 'bg-red-500';
    } else if (this.grossRanking === 'Medium')
      return 'bg-yellow-200';
    else if (this.grossRanking === 'Low') {
      return 'bg-green-500';
    }
    return '';
  }

  getResidualRankingBackgroundColor() {
    if (this.residualRanking === 'High') {
      return 'bg-red-500';
    } else if (this.residualRanking === 'Medium')
      return 'bg-yellow-200';
    else if (this.residualRanking === 'Low') {
      return 'bg-green-500';
    }
    return '';
  }

  addRisk() {
    if (this.riskForm.invalid) {
      this.riskForm.markAllAsTouched();
    } else {
      let payload = {
        ...this.riskForm.value,
        risk_id: this.data.formData.risk_id,
        asset_id: this.data.isFromEdit ? this.data?.formData.asset_id : this.data?.formData?.id,
        residualRankingValue: this.residualRankingValue,
        grossRankingValue: this.grossRankingValue,
        status: this.data?.isFromEdit ?
          (this.data?.formData?.status ===
          this.status[1] || this.data?.formData?.status === this.status[3] ||
          this.data?.formData?.status === this.status[6] ||
          this.data?.formData?.status === this.status[7] ?
            this.status[0] : this.data?.formData?.status) : this.status[0]
      }
      this.apiService.addRisk(payload).subscribe(res => {
        this.apiService.getSpecificFunction(this.data?.formData?.id);
        this.blService.openSnackBar(res.message);
        this.dialogRef.close();
      });
    }
  }
}
