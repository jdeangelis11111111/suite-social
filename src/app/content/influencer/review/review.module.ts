import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewComponent } from './review.component';

import {
    MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule, MatPaginatorModule,
    MatCardModule, MatToolbarModule, MatDialogModule, MatSortModule, MatTooltipModule
} from '@angular/material';
const routes = [
    {
        path: '',
        component: ReviewComponent
    }
];

@NgModule({
    declarations: [
        ReviewComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
        MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule, MatPaginatorModule,
        MatCardModule, MatToolbarModule, MatDialogModule, MatSortModule, MatTooltipModule
    ]
})

export class ReviewModule { }
