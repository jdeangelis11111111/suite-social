import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprovalComponent } from './approval.component';


const routes = [
    {
        path: '',
        component: ApprovalComponent
    }
];

@NgModule({
    declarations: [
        ApprovalComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class approvalModule { }
