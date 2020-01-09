import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BrandCardComponent } from '../brand-card/brand-card.component';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BrandService } from 'app/services/brand.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-req-details',
  templateUrl: './req-details.component.html',
  styleUrls: ['./req-details.component.scss']
})
export class ReqDetailsComponent implements OnInit {

  email: string;
  postList: any;
  showList = false;
  dataSource: MatTableDataSource<RoleData>;
  displayedColumns = ['id', 'title', 'description', 'active', 'edit' /* 'delete' */];

  constructor(public dialog: MatDialog, private brandService: BrandService, private router: Router, private cdRef: ChangeDetectorRef, ) {
    this.email = localStorage.getItem('email');
  }

  ngOnInit() {
    this.getPosts();
  }
  getPosts() {
    console.log('here')
    this.showList = true;
    this.brandService.getPosts(this.email).subscribe(Resp => {
      console.log(Resp);
      if (Resp.response == '200') {

        this.postList = Resp.list;
        console.log(this.postList);
        this.dataSource = new MatTableDataSource(this.postList);
        this.cdRef.detectChanges();
      }
    })
  }
  goToMsg(a) {

  }
  postC() {
    const dialogApp = this.dialog.open(BrandCardComponent, {
      height: '550px',
      width: '700px',
      disableClose: true,
      data: { 'type': 'postC', email: '' }
    });
    dialogApp.afterClosed().subscribe(result => {
      this.getPosts();
    });
  }
  editPost(data) {
    this.brandService.updTempRole(data);
    this.router.navigate(['content/brand/viewPost'])
  }
  deletePost() {
    const dialogAp = this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      disableClose: true,
      data: { 'message': 'Delete Post' }
    });
    dialogAp.afterClosed().subscribe(result => {

    });
  }
}
export interface RoleData {
  id: string;
  title: string;
  description: any;
  // modules: any;
}