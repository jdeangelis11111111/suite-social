import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleReviewsComponent } from './schedule-reviews.component';


const routes = [
    {
        path: '',
        component: ScheduleReviewsComponent
    }
];

@NgModule({
    declarations: [
        ScheduleReviewsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class schReviewModule { }
