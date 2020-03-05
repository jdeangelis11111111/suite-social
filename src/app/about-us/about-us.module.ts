import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const routes = [
  {
      path: '',
      component: AboutUsComponent
  }
];

@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ]
})
export class AboutUsModule { }
