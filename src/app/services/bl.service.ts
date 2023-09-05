import {Injectable} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class BlService {

  constructor(private snackBar: MatSnackBar) {
  }

  calculateRanking(ranking: number): string {
    switch (true) {
      case ranking > 0 && ranking <=2:
        return 'Low';
      case ranking > 2 && ranking <=4:
        return 'Medium';
      case ranking > 4:
        return 'High';
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
