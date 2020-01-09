import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PastCollabsComponent } from './past-collabs.component';
import { MatCardModule } from '@angular/material';


const routes = [
    {
        path: '',
        component: PastCollabsComponent
    }
];

@NgModule({
    declarations: [
        PastCollabsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule, MatCardModule
    ]
})

export class PastCollabsModule { }
