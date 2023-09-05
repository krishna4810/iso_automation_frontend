import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {HiraFormFields} from "../../../model/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent {

  @Output() openMatDialog = new EventEmitter<any>();
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() displayedColumns: string[] = [];
  @Input() dataSource = new MatTableDataSource<any>([]);
  @Input() isFromPermission?: boolean = false;

  async ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(row: any) {
      this.openMatDialog.emit(row);
  }
}
