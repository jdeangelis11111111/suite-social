import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { InfluencerService } from 'app/services/influencer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  email: string;
  reviewList: any;
  showList = false;
  dataSource: MatTableDataSource<RoleData>;
  displayedColumns = ['id', 'email', 'review', 'rate' /* 'delete' */];

  constructor(public dialog: MatDialog, private influencerService: InfluencerService, private router: Router, private cdRef: ChangeDetectorRef, ) {
    this.email = localStorage.getItem('email');
  }

  ngOnInit() {
    this.getReviews();
  }
  getReviews() {
    console.log('here')
    this.showList = true;
    this.influencerService.getReview(this.email).subscribe(Resp => {
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
  rate:any
  // modules: any;
}