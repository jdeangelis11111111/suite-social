import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FollowerAnalyticsComponent } from './follower-analytics.component';


const routes = [
    {
        path: '',
        component: FollowerAnalyticsComponent
    }
];

@NgModule({
    declarations: [
        FollowerAnalyticsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class FollowAnalyModule { }
