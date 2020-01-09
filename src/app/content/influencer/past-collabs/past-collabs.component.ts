import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InfluencerService } from 'app/services/influencer.service';
@Component({
  selector: 'app-past-collabs',
  templateUrl: './past-collabs.component.html',
  styleUrls: ['./past-collabs.component.scss']
})
export class PastCollabsComponent implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute, private router: Router, private service: InfluencerService, private cdRef: ChangeDetectorRef) {
    this.id = this.route.snapshot.queryParamMap.get('id');
    console.log(this.id);

  }
  ngOnInit() {

  }
}