import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewBrandComponent } from './review-brand.component';
import {
    MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule, MatPaginatorModule,
    MatCardModule, MatToolbarModule, MatDialogModule, MatSortModule, MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';

const routes = [
    {
        path: '',
        component: ReviewBrandComponent
    }
];

@NgModule({
    declarations: [
        ReviewBrandComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
        MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule, MatPaginatorModule,
        MatCardModule, MatToolbarModule, MatDialogModule, MatSortModule, MatTooltipModule,
        FlexLayoutModule,
        QuillModule,
        SharedPipesModule,

    ]
})

export class reviewBrandModule { }
