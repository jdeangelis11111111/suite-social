import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BrandService } from 'app/services/brand.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-review-brand',
  templateUrl: './review-brand.component.html',
  styleUrls: ['./review-brand.component.scss']
})
export class ReviewBrandComponent implements OnInit {
  email: string;
  reviewList: any;
  showList = false;
  dataSource: MatTableDataSource<RoleData>;
  displayedColumns = ['id', 'email', 'review', 'rate' /* 'delete' */];

  constructor(public dialog: MatDialog, private brandService: BrandService, private router: Router, private cdRef: ChangeDetectorRef, ) {
    this.email = localStorage.getItem('email');
  }

  ngOnInit() {
    this.getReviews();
  }
  getReviews() {
    console.log('here')
    this.showList = true;
    this.brandService.getReview(this.email).subscribe(Resp => {
      console.log(Resp);
      if (Resp.response == '200') {

        this.reviewList = Resp.list;
        console.log(this.reviewList);
        this.dataSource = new MatTableDataSource(this.reviewList);
        this.cdRef.detectChanges();
      }
    })
  }

}
export interface RoleData {
  id: string;
  email: string;
  review: any;
  rate: any
  // modules: any;
}