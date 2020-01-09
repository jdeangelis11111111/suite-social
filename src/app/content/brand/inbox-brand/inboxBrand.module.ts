import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InboxBrandComponent } from './inbox-brand.component';
import {
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatExpansionModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';

// import { AppInboxComponent } from './app-inbox.component';
// import { MailComposeComponent } from './mail-compose.component';
// import { InboxRoutes } from "./app-inbox.routing";
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';

const routes = [
    {
        path: '',
        component: InboxBrandComponent
    }
];

@NgModule({
    declarations: [
        InboxBrandComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule,
        MatInputModule,
        MatDialogModule,
        MatListModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatExpansionModule,
        FlexLayoutModule,
        QuillModule,
        SharedPipesModule,

    ]
})

export class inboxBrandModule { }
