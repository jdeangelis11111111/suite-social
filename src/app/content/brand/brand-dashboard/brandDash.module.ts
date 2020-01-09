import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandDashboardComponent } from './brand-dashboard.component';
import { MatCardModule, MatIconModule, MatProgressBarModule } from '@angular/material';
// import { ChartsModule } from 'ng2-charts';
// import { NgxEchartsModule } from 'ngx-echarts';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes = [
    {
        path: '',
        component: BrandDashboardComponent
    }
];

@NgModule({
    declarations: [
        BrandDashboardComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        MatCardModule, MatProgressBarModule, /* NgxEchartsModule,  ChartsModule, NgxChartsModule */
        ReactiveFormsModule, MatIconModule
    ]
})

export class BrandDashBoardModule {
    // node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --prod
}
