import {Component, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent {

  newDataSource = new MatTableDataSource<any>([]);

  @Output() openMatDialog = new EventEmitter<any>();
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() displayedColumns: string[] = [];
  @Input() dataSource = new MatTableDataSource<any>([]);
  @Input() isFromPermission?: boolean = false;

  async ngOnInit() {
    console.log(this.dataSource);
  }

  openDialog(row: any) {
      this.openMatDialog.emit(row);
  }
}
