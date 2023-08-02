import {Component, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddHiraComponent} from "../add-hira/add-hira.component";
import {MatTableDataSource} from "@angular/material/table";
import {Role} from "../../../../model/interfaces";
import {ApiService} from "../../../../services/api.service";
import {StateService} from "../../../../services/state.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-hira-table',
  templateUrl: './hira-table.component.html',
  styleUrls: ['./hira-table.component.scss']
})
export class HiraTableComponent {

  hiraList: any[] | undefined = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private apiService: ApiService,
              private stateService: StateService) {
  }

  async ngOnInit() {
    this.apiService.getHira();
    this.stateService.stateChanged.subscribe(state => {
      if(state?.hiraList) {
        this.hiraList = state?.hiraList;
        // @ts-ignore
        this.displayedColumns = Object.keys(this.hiraList[0]).filter(key => !(
          ['address','unit', 'doc_number',
            'created_at', 'updated_at', 'year',
            'sub_activity_name','gross_likelihood', 'gross_impact',
            'start_date'].includes(key)));
        this.dataSource = new MatTableDataSource<Role>(this.hiraList);
        this.dataSource.paginator = this.paginator;
        this.dataSource = new MatTableDataSource<Role>(this.hiraList);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
