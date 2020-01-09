import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RangeofPayComponent } from './rangeof-pay.component';


const routes = [
    {
        path: '',
        component: RangeofPayComponent
    }
];

@NgModule({
    declarations: [
        RangeofPayComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class ROPModule { }
