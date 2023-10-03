import {AfterViewInit, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent implements AfterViewInit{
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @Input() isFromPermission?: boolean = false;
  @Output() openMatDialog = new EventEmitter<any>();
  @ViewChild(MatSort) set contentSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator) set contentPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(private apiService: ApiService) {
  }

  ngAfterViewInit() {
  }

  openDialog(row: any) {
      this.openMatDialog.emit(row);
  }
}
