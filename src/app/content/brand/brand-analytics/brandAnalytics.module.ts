import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandAnalyticsComponent } from './brand-analytics.component';


const routes = [
    {
        path: '',
        component: BrandAnalyticsComponent
    }
];

@NgModule({
    declarations: [
        BrandAnalyticsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class analyticsBrandModule { }
