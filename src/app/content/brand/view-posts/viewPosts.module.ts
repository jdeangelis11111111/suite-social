import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewPostsComponent } from './view-posts.component';
import {
    MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule, MatPaginatorModule,
    MatCardModule, MatToolbarModule, MatDialogModule, MatSortModule, MatTooltipModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes = [
    {
        path: '',
        component: ViewPostsComponent
    }
];

@NgModule({
    declarations: [
        ViewPostsComponent
    ],
    imports: [
        CommonModule, NgbModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
        MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule, MatPaginatorModule,
        MatCardModule, MatToolbarModule, MatDialogModule, MatSortModule, MatTooltipModule
    ]
})

export class viewPostsModule { }
