import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    // Guard for Modules
    { path: '', loadChildren: () => import('./brand-dashboard/brandDash.module').then(m => m.BrandDashBoardModule) },
    { path: 'brandDash', loadChildren: () => import('./brand-dashboard/brandDash.module').then(m => m.BrandDashBoardModule) },
    { path: 'searchInf', loadChildren: () => import('./search-brand/searchBrand.module').then(m => m.searchBrandModule) },
    { path: 'reqDet', loadChildren: () => import('./req-details/reqDetails.module').then(m => m.reqDetailsModule) },
    { path: 'priceInf', loadChildren: () => import('./brand-payment/brandPay.module').then(m => m.payBrandModule) },
    { path: 'approval', loadChildren: () => import('./approval/approval.module').then(m => m.approvalModule) },
    { path: 'contactBrand', loadChildren: () => import('./brand-contact/brandContact.module').then(m => m.contactBrandModule) },
    { path: 'brandAnalytics', loadChildren: () => import('./brand-analytics/brandAnalytics.module').then(m => m.analyticsBrandModule) },
    { path: 'brandPayment', loadChildren: () => import('./../influencer/payment/payment.module').then(m => m.PaymentModule) },
    { path: 'reviewBrand', loadChildren: () => import('./review-brand/reviewBrand.module').then(m => m.reviewBrandModule) },
    { path: 'inboxB', loadChildren: () => import('./inbox-brand/inboxBrand.module').then(m => m.inboxBrandModule) },
    { path: 'viewPost', loadChildren: () => import('./view-posts/viewPosts.module').then(m => m.viewPostsModule) },
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.profileModule) },
    { path: 'transList', loadChildren: () => import('./../influencer/contract/contract.module').then(m => m.ContractModule) },
    { path: 'invoice', loadChildren: () => import('./../influencer/past-collabs/pastCollabs.module').then(m => m.PastCollabsModule) },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BrandRoutingModule { }
