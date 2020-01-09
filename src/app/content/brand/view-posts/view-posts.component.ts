import { Component, OnInit } from '@angular/core';
import { BrandService } from 'app/services/brand.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss']
})
export class ViewPostsComponent implements OnInit {
  data: any;
  some = ['https://picsum.photos/900/500?random&t=1', 'https://picsum.photos/900/500?random&t=3', 'https://picsum.photos/900/500?random&t=4',]
  imageAr: any[];
  constructor(private brandService: BrandService) {
    this.imageAr = [];
    this.brandService.currentTempRole.subscribe(updData => {
      console.log('data', updData)
      this.data = updData;
    })
    this.imageAr = this.data.images.split(',');
    console.log(this.imageAr)
  }
  ngOnInit() {
  }
}