import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractComponent } from './contract.component';
import {
    MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule, MatPaginatorModule,
    MatCardModule, MatToolbarModule, MatDialogModule, MatSortModule, MatTooltipModule
} from '@angular/material';

const routes = [
    {
        path: '',
        component: ContractComponent
    }
];

@NgModule({
    declarations: [
        ContractComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
        MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule, MatPaginatorModule,
        MatCardModule, MatToolbarModule, MatDialogModule, MatSortModule, MatTooltipModule
    ]
})

export class ContractModule { }
