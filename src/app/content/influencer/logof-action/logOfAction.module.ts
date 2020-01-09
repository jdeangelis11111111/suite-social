import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogofActionComponent } from './logof-action.component';


const routes = [
    {
        path: '',
        component: LogofActionComponent
    }
];

@NgModule({
    declarations: [
        LogofActionComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class LogOfActionModule { }
