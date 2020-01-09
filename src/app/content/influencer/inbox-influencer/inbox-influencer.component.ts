import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { MatSidenav, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { InfCardComponent } from '../inf-card/inf-card.component';
import { BrandService } from 'app/services/brand.service';
import { ConfirmDialogInfComponent } from '../confirm-dialog-inf/confirm-dialog-inf.component';
@Component({
  selector: 'app-inbox-influencer',
  templateUrl: './inbox-influencer.component.html',
  styleUrls: ['./inbox-influencer.component.scss']
})
export class InboxInfluencerComponent implements OnInit {
  isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = true;
  selectToggleFlag = false;
  @ViewChild(MatSidenav, { static: false }) private sideNav: MatSidenav;
  messages;
  typeMsg: string;
  showDetailMsg = false;
  email: string;
  ut: string;
  messages2: any;
  showNoRecords = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  showNoRecordsA = false;
  fromEmail: any;
  constructor(private router: Router, public dialog: MatDialog, private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver, private brandService: BrandService, public snackBar: MatSnackBar,
    public composeDialog: MatDialog, ) {
    this.email = localStorage.getItem('email');
    console.log(this.email);
    this.ut = localStorage.getItem('userType');
    console.log(this.ut);
    this.typeMsg = 'Inbox Messages';


  }
  ngOnInit() {
    this.getMsgs('mainInbox', '');
    this.inboxSideNavInit();
  }
  openComposeDialog() {

  }
  selectToggleAll() {
    // this.selectToggleFlag = !this.selectToggleFlag;
    // this.messages.forEach((msg) => { msg.selected = this.selectToggleFlag });
  }

  stopProp(e) {
    e.stopPropagation()
  }

  updateSidenav() {

  }
  getMsgs(type, message) {

    if (type == 'mainInbox') {
      this.brandService.getMsgs(this.email, this.ut).subscribe(Resp => {
        console.log(Resp);
        if (Resp.response == '200') {
          this.messages = Resp.object;
          this.cdRef.detectChanges();
        }
        else {
          this.showNoRecords = true;
          this.cdRef.detectChanges();
        }

      })
    }
    else if (type == 'detailInbox') {

      this.brandService.getDetailMsgs(this.email, this.ut, message).subscribe(Resp => {
        console.log(Resp);
        if (Resp.response == '200') {
          this.messages2 = Resp.object;
          this.cdRef.detectChanges();
        }
        this.cdRef.detectChanges();
      })
    }
  }
  reply(email) {
    console.log(email);
    const dialogApp = this.dialog.open(InfCardComponent, {
      height: '527px',
      width: '700px',
      disableClose: true,
      data: { 'type': 'msg', 'email': email }
    });
    dialogApp.afterClosed().subscribe(result => {

    });
  }
  view(type) {
    if (type == 'sent') {
      this.typeMsg = 'Sent Messages';
      this.showDetailMsg = false;
      this.getMsgs('sent', '');

    }
    else if (type == 'inbox') {
      this.typeMsg = 'Inbox Messages';
      this.showDetailMsg = false;
      this.getMsgs('inbox', '');

    }
  }
  goToMsg(msg) {
    console.log(msg);
    this.typeMsg = msg.name;
    this.fromEmail = msg.email;
    this.showDetailMsg = true;
    this.getMsgs('detailInbox', msg);

  }
  delete(msg) {
    console.log(msg);
    const dialogAp = this.dialog.open(ConfirmDialogInfComponent, {
      width: '380px',
      disableClose: true,
      data: { 'message': 'Delete Message' }
    });
    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.brandService.deleteMsg(msg.id).subscribe(Resp => {
          if (Resp.response == '200') {
            this.openSnackBar('Deletion Successful')
            this.messages.forEach((element, i) => {
              if (element.id === msg.id) {
                console.log('delete', i, element.id, msg.id)
                this.messages.splice(i, 1);
              }
              this.cdRef.detectChanges();
            });
          }
        })
        if (this.messages.length == 0) {
          this.showNoRecords = true;
        }
        console.log(this.messages);
      }
    });
  }
  deleteD(msg) {
    console.log(msg);
    const dialogAp = this.dialog.open(ConfirmDialogInfComponent, {
      width: '380px',
      disableClose: true,
      data: { 'message': 'Delete Message' }
    });
    dialogAp.afterClosed().subscribe(result => {
      if (result) {
        this.brandService.deleteMsg(msg.id).subscribe(Resp => {
          if (Resp.response == '200') {
            this.openSnackBar('Deletion Successful')
            this.messages2.forEach((element, i) => {
              if (element.id === msg.id) {
                console.log('delete', i, element.id, msg.id)
                this.messages2.splice(i, 1);
                console.log(this.messages.length);
                if (this.messages2.length == 0) {
                  console.log(this.messages2.length, 'ok')
                  this.showNoRecordsA = true;
                  this.cdRef.detectChanges();
                }
              }
              this.cdRef.detectChanges();
            });
          }
        })
      }
    });
  }
  deleteAll() {
    const dialogAp = this.dialog.open(ConfirmDialogInfComponent, {
      width: '380px',
      disableClose: true,
      data: { 'message': 'Delete All Messages' }
    });
    dialogAp.afterClosed().subscribe(result => {

    });
  }
  goBack() {
    console.log('here');
    this.showDetailMsg = false;
    this.messages2 = [];
    this.getMsgs('mainInbox', '')
  }
  inboxSideNavInit() {
    /*   this.isMobile = this.mediaObserver.isActive('xs') || this.mediaObserver.isActive('sm');
      this.updateSidenav();
      this.screenSizeWatcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
        this.isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');
        this.updateSidenav();
      }); */
  }
  openSnackBar(message) {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
