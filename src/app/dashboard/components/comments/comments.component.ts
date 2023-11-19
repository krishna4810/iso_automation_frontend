import {Component, Inject} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {combineLatest, forkJoin, map} from 'rxjs';
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  combinedData: any[] = [];
  comments: any[] = [];

  constructor(private apiService: ApiService,
              @Inject(MAT_DIALOG_DATA) public data: { id: string, isRisk?: boolean}) {
  }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.apiService.getComment(this.data.id).subscribe((comments: any[]) => {
      this.comments = comments;
      const requests = this.comments.map(comment => this.apiService.getUserData(comment.user_id));
      forkJoin(requests).subscribe(userDataResponses => {
        for (let i = 0; i < this.comments.length; i++) {
          const comment = this.comments[i];
          const userData = userDataResponses[i];
          this.combinedData.push({...comment, userData: userData});
        }
      });
    });
  }

}
