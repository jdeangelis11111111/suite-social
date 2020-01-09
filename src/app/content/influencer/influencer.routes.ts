import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

    // Guard for Modules
    { path: '', loadChildren: () => import('./infl-dashboard/infl-dashboard.module').then(m => m.InfluencerDashBoardModule) },
    { path: 'InfluencerDash', loadChildren: () => import('./infl-dashboard/infl-dashboard.module').then(m => m.InfluencerDashBoardModule) },
    { path: 'searchBrand', loadChildren: () => import('./search-inf/searchInf.module').then(m => m.SearchInfModule) },
    { path: 'personal', loadChildren: () => import('./personal-info/personalInfo.module').then(m => m.PersonalInfoModule) },
    { path: 'analytics', loadChildren: () => import('./follower-analytics/followerAnalytics.module').then(m => m.FollowAnalyModule) },
    { path: 'pastCol', loadChildren: () => import('./past-collabs/pastCollabs.module').then(m => m.PastCollabsModule) },
    { path: 'range', loadChildren: () => import('./rangeof-pay/rangeOfPAy.module').then(m => m.ROPModule) },
    { path: 'postLink', loadChildren: () => import('./post-link/postLink.module').then(m => m.PostLinkModule) },
    { path: 'review', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule) },
    { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },

    { path: 'incomReq', loadChildren: () => import('./incoming-request/incomingReq.module').then(m => m.IncomingReqModule) },
    { path: 'outReq', loadChildren: () => import('./outgoing-req/outgoingReq.module').then(m => m.OutgoingReqModule) },
    { path: 'brandReq', loadChildren: () => import('./brand-req/brandReq.module').then(m => m.BrandReqModule) },
    { path: 'brandInf', loadChildren: () => import('./brand-info/brandInfo.module').then(m => m.BrandInfoModule) },
    { path: 'do', loadChildren: () => import('./don-dont/donDonts.module').then(m => m.DonDontsModule) },
    { path: 'logs', loadChildren: () => import('./logof-action/logOfAction.module').then(m => m.LogOfActionModule) },
    { path: 'contract', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule) },
    { path: 'feedback', loadChildren: () => import('./feedback/feedback.module').then(m => m.feedbackModule) },
    { path: 'reviews', loadChildren: () => import('./schedule-reviews/scheduleReviews.module').then(m => m.schReviewModule) },
    { path: 'inboxInf', loadChildren: () => import('./inbox-influencer/inboxInf.module').then(m => m.inboxInfModule) },
    { path: 'transList', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule) },
    { path: 'invoice', loadChildren: () => import('./past-collabs/pastCollabs.module').then(m => m.PastCollabsModule) },
    // { path: '', loadChildren: './infl-dashboard/infl-dashboard.module#InfluencerDashBoardModule' },
    // { path: 'idash', loadChildren: './infl-dashboard/infl-dashboard.module#InfluencerDashBoardModule' },
    // { path: 'profile', loadChildren: './infl-profile/infl-profile.module#InfluencerProfileModule' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InfluencerRoutingModule { }
