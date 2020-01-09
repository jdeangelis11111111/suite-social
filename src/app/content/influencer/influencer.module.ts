import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfluencerRoutingModule } from './influencer.routes';
import { InfCardModule } from './inf-card/inf-card.module';
import { ConfirmDialogInfModule } from './confirm-dialog-inf/confirmDialogInf.module';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        InfluencerRoutingModule,
        //  RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        InfCardModule, ConfirmDialogInfModule
    ]
})

export class InfDashBoardModule { }
