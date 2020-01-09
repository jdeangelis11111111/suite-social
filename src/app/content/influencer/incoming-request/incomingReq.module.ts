import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncomingRequestComponent } from './incoming-request.component';


const routes = [
    {
        path: '',
        component: IncomingRequestComponent
    }
];

@NgModule({
    declarations: [
        IncomingRequestComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class IncomingReqModule { }
