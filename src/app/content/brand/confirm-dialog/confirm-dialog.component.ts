import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  message: string;
}
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  sendMsg() {

    this.dialogRef.close(true);

  }
}
