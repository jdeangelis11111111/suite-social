import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
// import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
// import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { socialClientIDs } from '../socialUserIDS.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'angular-6-social-login';


/* const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(socialClientIDs.google)
   } ,
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(socialClientIDs.fb)
    }
  ]);

  export function provideConfig() {
    return config;
  } */

const routes = [
  {
    path: '',
    component: SignupComponent
  }
];

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    //  SocialLoginModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService
    /*  {
         provide: AuthServiceConfig,
         useFactory: provideConfig
       } */
  ]
})

export class SignUpModule { }
