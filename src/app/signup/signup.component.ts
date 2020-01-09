import { Component, OnInit } from '@angular/core';
// import { AuthService, SocialUser } from 'angularx-social-login';
// import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import $ from 'jquery';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
// import { AuthService as auth, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  // private user: SocialUser;
  private loggedIn: boolean;
  orgName: any = '';
  brandForm: FormGroup;
  brandFormErrors: any;
  influencerForm: FormGroup;
  influencerFormErrors: any;
  isBrand: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public router: Router, /* private socialAuthService: auth,  private authService: AuthService, */
    private formBuilder: FormBuilder, private signServe: LoginService, public snackBar: MatSnackBar,/*  private toastr: ToastrService */) {


    this.isBrand = true;

    const Regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    const PWDRegex = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/);

    this.brandForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Regex)]],
      password: ['', [Validators.required, Validators.pattern(PWDRegex)]],
      name: ['', Validators.required],
      orgKey: ['', Validators.required],
      termsCheck: [false, Validators.required]
    });


    this.influencerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Regex)]],
      password: ['', [Validators.required, Validators.pattern(PWDRegex)]],
      termsCheck: [false, Validators.required]
    });
  }

  ngOnInit() {
    /*   this.authService.authState.subscribe((user) => {
        console.log('user status =', user);
  
        this.user = user;
        this.loggedIn = (user != null);
      }); */


    $('.brand-id').click(function () {
      $('.brand-id label').addClass('active-hover');
      $('.influence-id label').removeClass('active-hover');
      $('.brand-orgnization').slideDown(300);
      $('.influence_user').slideUp(300);
    });

    $('.brand-orgnization form button').click(function () {
      $('.brand-under-orgnization').slideDown(300);
    });

    $('.influence-id').click(function () {
      $('.influence-id label').addClass('active-hover');
      $('.brand-id label').removeClass('active-hover');
      $('.influence_user').slideDown(300);
      $('.brand-orgnization').slideUp(300);
      $('.brand-under-orgnization').slideUp(300);
    });
  }
  /* 
    public socialSignIn(socialPlatform: string) {
      console.log('social sign in called', socialPlatform);
  
      let socialPlatformProvider;
      if (socialPlatform === 'facebook') {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      } else if (socialPlatform === 'google') {
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }
  
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform + ' sign in data : ', userData);
          // Now sign-in with userData
          // ...
          // tslint:disable-next-line:triple-equals
          if (userData.provider == 'facebook') {
  
            this.router.navigate(['influencer']);
            // this.toastr.success(`${JSON.stringify(userData)}`, 'Facebook Login Successfully');
            this.openSnackBar('Facebook Login Successfully');
          }
        }
      );
    } */

  get b() {
    return this.brandForm.controls;
  }

  get i() {
    return this.influencerForm.controls;
  }



  checkOrgName(): boolean {
    if (this.orgName.trim() !== '') {
      return false;
    } else {
      return true;
    }
  }

  checkOrgStatus() {
    this.isBrand = true;
    this.signServe.verifyOrganisation(this.orgName).subscribe(res => {
      console.log('Org name verify=', res);
      // tslint:disable-next-line:triple-equals
      if (res.status == 1) {

        this.isBrand = true;
        this.brandForm.patchValue({
          name: res.organization.organizationName,
          orgKey: res.organization.organizationKey
        });

      } else {
        this.isBrand = false;
        // this.toastr.info(`${res.message}`, 'Brand Already Exists');
        this.openSnackBar1('Brand Already Exists');
      }
    });
  }

  brandFormSubmit() {
    console.log('Brand Form', this.brandForm.value);

    // tslint:disable-next-line:triple-equals
    if (this.brandForm.value.name.trim() != '' && this.brandForm.value.password.trim() != '' && this.brandForm.valid) {
      this.signServe.createOrganisation(this.brandForm.value).subscribe(res => {
        console.log('create org=', res);
        // tslint:disable-next-line:triple-equals
        if (res.status == 1) {

          localStorage.setItem('user', this.brandForm.value.email);
          const user = this.brandForm.value.email;
          //   this.signServe.currentUser(this.brandForm.value);
          // Show alert successfully created user
          // this.toastr.success('A verification mail has been sent to your registered email-id', 'Brand Request Submitted Successfully');
          this.openSnackBar('A verification mail has been sent to your registered email-id,Brand Request Submitted Successfully');
          // Redirect to login
          this.router.navigate(['/verify_account']);
          // tslint:disable-next-line:triple-equals
        } else if (res.status == 0 && res.response == 401) {
          // Show alert successfully created user
          // this.toastr.info(`${res.message}`, 'Brand Already Exists');

          this.brandForm.reset();
          $('.brand-id').click(function () {
            $('.brand-id label').addClass('active-hover');
            $('.influence-id label').removeClass('active-hover');
            $('.brand-orgnization').slideDown(300);
            $('.influence_user').slideUp(300);
          });
        } else {
          // this.toastr.info(`${res.message}`);
          this.openSnackBar(`${res.message}`);
        }
      });
    }
  }

  addInfluencer() {
    console.log('add influencer=', this.influencerForm.value);

    this.signServe.registerInfluencer(this.influencerForm.value).subscribe(res => {
      console.log('register Influe=', res);
      // tslint:disable-next-line:triple-equals
      if (res.status == 1) {
        localStorage.setItem('user', this.influencerForm.value.email);
        // Show alert successfully created user
        // this.toastr.success('A verification mail has been sent to your registered email-id', 'Influencer Request Submitted Successfully');
        this.openSnackBar('A verification mail has been sent to your registered email-id, Influencer Request Submitted Successfully')
        // Redirect to login
        this.router.navigate(['/verify_account']);
      } else if (res.response == 200) {
        // this.toastr.info(`${res.message}`, 'User Already Exists');
        this.openSnackBar1('User Already Exists')

      } else {
        // this.toastr.info(`${res.message}`, 'Please Try Again');
        this.openSnackBar1('')
      }

    });
  }
  terms(type) {
    console.log('terms & conditions');
    if (type == 'terms')
      this.router.navigate(['/reset_password'], { queryParams: { 'path': 'terms' } });
    else if (type == 'policy')
      this.router.navigate(['/reset_password'], { queryParams: { 'path': 'policy' } });
  }
  openSnackBar(status) {
    this.snackBar.open(status, '', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openSnackBar1(status) {
    this.snackBar.open(status, 'Please Try Again', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
