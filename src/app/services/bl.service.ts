import {Injectable} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class BlService {

  constructor(private snackBar: MatSnackBar) {
  }

  calculateRanking(likelihood: number, impact: number): string {
    switch (true) {
      case likelihood === 1 && (impact && impact <= 2) || (likelihood === 2 && impact === 1):
        return 'Low';
      case (likelihood === 1 && impact === 3):
        return 'Medium';
      case (likelihood === 2 && impact === 2) || (likelihood === 3 && impact && (impact < 2)):
        return 'Medium';
      case (likelihood === 3 && (impact === 3 || impact === 2)) || (likelihood === 2 && impact === 3):
        return 'High';
      default:
        return '';
    }
    return '';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
