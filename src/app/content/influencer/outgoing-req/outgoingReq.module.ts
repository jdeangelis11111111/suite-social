import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutgoingReqComponent } from './outgoing-req.component';


const routes = [
    {
        path: '',
        component: OutgoingReqComponent
    }
];

@NgModule({
    declarations: [
        OutgoingReqComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class OutgoingReqModule { }
