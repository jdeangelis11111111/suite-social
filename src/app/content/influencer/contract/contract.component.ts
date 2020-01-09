import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfluencerService } from 'app/services/influencer.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  pageType: string = "contract";
  email: string;
  ut: string;
  dataSource: MatTableDataSource<RoleData>;
  displayedColumns = ['id', 'from', 'to', 'amount', 'date', 'status', /* 'view' */];
  list: any;
  constructor(private route: ActivatedRoute, private router: Router, private service: InfluencerService, private cdRef: ChangeDetectorRef) {
    this.email = localStorage.getItem('email');
    this.ut = localStorage.getItem('userType');
    this.pageType = this.route.snapshot.queryParamMap.get('t');
    console.log('Type', this.pageType);
    if (this.pageType == null)
      this.pageType = 'contract';
    // this.cdRef.detectChanges()
  }

  ngOnInit() {
    this.getTransactions();
  }
  getTransactions() {
    this.service.getTransacts(this.email, this.ut).subscribe(Resp => {
      console.log(Resp);
      if (Resp.response == '200') {

        this.list = Resp.list;
        console.log(this.list);
        this.dataSource = new MatTableDataSource(this.list);
        this.cdRef.detectChanges();
      }
    })
  }
  viewTransacts(transact) {
    if (this.ut == '2')
      this.router.navigate(['/content/influencer/invoice'], { queryParams: { id: transact.transactionId } });
    else
      this.router.navigate(['/content/brand/invoice'], { queryParams: { id: transact.transactionId } });
  }
}
export interface RoleData {
  id: string;
  from: string;
  to: any;
  amount: any;
  status: any;
  // modules: any;
}