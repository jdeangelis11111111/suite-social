import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  message: string;
}
@Component({
  selector: 'app-confirm-dialog-inf',
  templateUrl: './confirm-dialog-inf.component.html',
  styleUrls: ['./confirm-dialog-inf.component.scss']
})
export class ConfirmDialogInfComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogInfComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  sendMsg() {

    this.dialogRef.close(true);

  }
}
