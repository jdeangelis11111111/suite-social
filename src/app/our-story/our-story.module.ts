import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurStoryComponent } from './our-story.component';
import { RouterModule } from '@angular/router';


const routes = [
  {
      path: '',
      component: OurStoryComponent
  }
];

@NgModule({
  declarations: [OurStoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class OurStoryModule { }
