import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InflDashboardComponent } from './infl-dashboard.component';
import { MatCardModule, MatIconModule, MatProgressBarModule } from '@angular/material';
// import { ChartsModule } from 'ng2-charts';
// import { NgxEchartsModule } from 'ngx-echarts';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
const routes = [
    {
        path: '',
        component: InflDashboardComponent
    }
];

@NgModule({
    declarations: [
        InflDashboardComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule, MatIconModule, MatProgressBarModule,
        MatCardModule, /* NgxEchartsModule,NgxChartsModule */
    ]
})

export class InfluencerDashBoardModule { }
