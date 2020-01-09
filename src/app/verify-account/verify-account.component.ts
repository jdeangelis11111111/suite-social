import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  otpValue: any = '';
  email: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  otpV: string;
  constructor(
    private signServe: LoginService, public snackBar: MatSnackBar,
    /*     private toastr: ToastrService, */
    public router: Router
  ) {
    const otp = localStorage.getItem('otp');
    this.otpV = localStorage.getItem('otpVeri');
    if (otp == '1') {
      this.router.navigate(['/login'])
    }
    const user = localStorage.getItem('user');
    console.log('localUser', user);
    if (user) {
      this.email = user;
      console.log('this.email', this.email);
    }
  }

  ngOnInit() { }

  checkOtpVal(): boolean {
    if (this.otpValue.trim() !== '' && this.email.trim() !== '') {
      return false;
    } else {
      return true;
    }
  }

  resendVerifyCode() {
    this.signServe.resendOtp(this.email).subscribe(res => {
      console.log('verify otp', res);
      if (res.response == 200) {
        // Show alert successfully created user
        // this.toastr.success(`${res.message}`, 'Request Successfully');
        this.openSnackBar(`${res.message}` + ' Request Successfully')
      } else {
        // this.toastr.info(`${res.message}`, 'Please Try Again');
        this.openSnackBar1(`${res.message}`)
      }
    });
  }

  verifyOtp() {
    this.signServe.verifyOtp(this.email, this.otpValue).subscribe(res => {
      console.log('verify otp', res);
      if (res.response == 200) {
        // Show alert successfully created user
        // this.toastr.success(`${res.message}`, 'Request Successfully');
        this.openSnackBar('Otp Verification Succeesful')
        // Redirect to login
        this.router.navigate(['/login']);
        localStorage.clear();
        localStorage.setItem('otpVeri', 'true');
      } else {
        // this.toastr.info(`${res.message}`, 'Please Try Again');
        this.openSnackBar1(`${res.message}`)
      }
    });
  }
  backToLogin() {
    this.router.navigate(['/login']);
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
