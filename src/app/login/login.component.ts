import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
// import { ToastrService } from 'ngx-toastr';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { AuthService as auth, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  islogin: any;
  loginForm: FormGroup;
  user: any;
  fgtEmail: any = '';
  userType: any;

  socialLogin: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private router: Router, private formBuilder: FormBuilder, private signServe: LoginService,
    /* private toastr: ToastrService,  */ public snackBar: MatSnackBar, private socialAuthService: auth) {

    this.islogin = 'login';


    const Regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Regex)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    $('.choose-brand').click(function () {
      $('.choose-brand label').addClass('active-hover');
      $('.choose-influencer label').removeClass('active-hover');
      $('.social-show').slideUp(300);
    });

    $('.choose-influencer').click(function () {
      $('.choose-influencer label').addClass('active-hover');
      $('.choose-brand label').removeClass('active-hover');
      $('.social-show').slideDown(300);
    });
  }

  get b() {
    return this.loginForm.controls;
  }

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

        if (userData.provider == 'facebook') {

          this.router.navigate(['influencer']);
          // this.toastr.success(`${JSON.stringify(userData)}`, 'Facebook Login Successfully');
          this.openSnackBar('Facebook Login Successful');
        }
        // Now sign-in with userData
        // ...

      }
    );
  }


  socialLoginType(val): void {
    console.log('socialLoginType', val);

    this.signServe.sendMessage(val);
  }

  doNameChange(event: any) {
    console.log('user change event', event);
    this.userType = event;
    if (event == 1) {
      $('.choose-brand').click(function () {
        $('.choose-brand label').addClass('active-hover');
        $('.choose-influencer label').removeClass('active-hover');
        $('.social-show').slideUp(300);
      });
    } else {
      $('.choose-influencer').click(function () {
        $('.choose-influencer label').addClass('active-hover');
        $('.choose-brand label').removeClass('active-hover');
        $('.social-show').slideDown(300);
      });
    }
  }






  checkfgtEmail(): boolean {
    if (this.fgtEmail.trim() !== '') {
      return false;
    } else {
      return true;
    }
  }


  userLogIn() {
    console.log('signIn', this.userType, this.loginForm.value);
    // this.router.navigate(['influencer']);
    if (this.loginForm.valid && this.userType !== undefined) {
      this.signServe.signinUser(this.userType, this.loginForm.value).subscribe(res => {
        console.log('user login response =', res);
        if (res.response == 'OK') {
          console.log('toaster success');
          localStorage.setItem('userType', res.userType);
          localStorage.setItem('survey', res.isServeyCompleted);
          localStorage.setItem('otp', res.isOtpVerified);
          this.openSnackBar('Login Successful');
          this.userType = undefined;
          if (res.userType == 1) {
            this.router.navigate(['content/brand']);
            localStorage.setItem('user', res.userId);
            localStorage.setItem('email', res.organizationEmail);
          } else if (res.userType == 2) {
            // localStorage.setItem('userType', res.userType);
            localStorage.setItem('user', res.influencerUserId);
            // localStorage.setItem('survey', res.isServeyCompleted);
            localStorage.setItem('email', res.influncerEmail);
            this.router.navigate(['content/influencer']);

          }
          else {
            console.log('here else')
          }
        } else {
          console.log('toaster info');
          if (res.message == 'Otp not verfied') {
            console.log('here')
            localStorage.setItem('user', this.loginForm.value.email);
            this.router.navigate(['/verify_account']);
          }
          // this.toastr.info(`${res.message}`, 'Please Try Again!');
          this.openSnackBar(res.message);
        }
      }, error => {
        console.log('sign in error', error);
      });
    } else if (this.userType == undefined) {
      // this.toastr.info(`Please select the valid Account Type`, 'Please Select An Account !');
      this.openSnackBar('Please select the valid Account Type');
    } else {
      // this.toastr.info(`Please provide valid inputs`, 'Please Try Again!');
      this.openSnackBar('Please provide valid inputs');
    }
  }

  forgetPass() {
    this.islogin = 'fgtPass';
  }
  forgotSend() {
    if (this.fgtEmail.trim() != '' && this.userType !== undefined) {
      this.signServe.forgetPass(this.userType, this.fgtEmail.trim()).subscribe(Resp => {
        if (Resp.response == '200') {
          console.log('Resp', Resp)
          this.openSnackBar('A reset link has been sent to your registered Email-Id');
          this.fgtEmail = "";
        }
        else {
          this.openSnackBar(Resp.message)
        }
      }, error => {
        this.openSnackBar(error.message)
      })
    }
    else if (this.userType == undefined) {
      // this.toastr.info(`Please select the valid Account Type`, 'Please Select An Account !');
      this.openSnackBar('Please select the valid Account Type');
    } else {
      // this.toastr.info(`Please provide valid inputs`, 'Please Try Again!');
      this.openSnackBar('Please provide valid inputs');
    }
  }
  toLogIn() {
    this.islogin = 'login';
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
