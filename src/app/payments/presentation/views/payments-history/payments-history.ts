import {Component, computed, inject, ViewChild} from '@angular/core';
import {PaymentsStore} from '../../../application/payments.store';
import {Router} from '@angular/router';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatError} from '@angular/material/form-field';
import {MatButton, MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-payments-history',
  imports: [
    MatProgressSpinner,
    MatError,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    TranslatePipe,
    MatSort,
    MatPaginator,
    MatIconButton,
    MatSortHeader,
    MatIcon
  ],
  templateUrl: './payments-history.html',
  styleUrl: './payments-history.css'
})
export class PaymentsHistory {
  readonly store = inject(PaymentsStore);
  protected router = inject(Router);

  displayedColumns: string[] = [
    "ID",
    "Subscription ID",
    "Amount",
    "Currency",
    "Method",
    "Paid At",
    "Status",
    "External Tran. ID"
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = computed(() => {
    const source = new MatTableDataSource(this.store.transactions());
    source.sort = this.sort;
    source.paginator = this.paginator;
    return source;
  });

  ngAfterViewChecked() {
    if (this.dataSource().paginator !== this.paginator) {
      this.dataSource().paginator = this.paginator;
    }
    if (this.dataSource().sort !== this.sort) {
      this.dataSource().sort = this.sort;
    }
  }
}
