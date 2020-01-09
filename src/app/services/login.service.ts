import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Links } from 'app/links.module';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user = new BehaviorSubject<any>(null);
  currentUser = this.user.asObservable();

  private messageSource = new Subject<any>();
  // currentLogin = this.messageSource.asObservable();
  private subject = new Subject<any>();

  encryptSecretKey = '91e@0#5a942@@9ef';

  constructor(private http: HttpClient) { }

  loggedIn() {
    // return true;//tokenNotExpired('jwtToken');
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
    // return !!localStorage.getItem('jwtToken');
  }
  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  changeLogin(message: string) {
    this.messageSource.next(message);
    console.log('social login type', message);
  }


  updUser(newUser) {
    this.user.next(newUser);
    console.log('updUser', this.user);
  }


  // The set method is use for encrypt the value.
  setEncrypt(keys, value) {
    const ivstr = 'ADVANTALSUITESOCIAL';
    const key = CryptoJS.enc.Utf8.parse(keys);
    const iv = CryptoJS.enc.Utf8.parse(ivstr);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }

  signinUser(userType, user) {

    console.log('Sign In Service ==.', user);

    const data = {
      userType: userType,
      emailId: user.email,
      password: this.setEncrypt(this.encryptSecretKey, user.password.trim())
    };
    console.log(data);

    return this.http.post(Links.SIGNIN, data).pipe(map((response: any) => response));
  }

  registerInfluencer(user) {

    console.log('RegisterInfluencer', user);
    const data = {
      password: this.setEncrypt(this.encryptSecretKey, user.password.trim()),
      email: user.email
    };
    console.log(data);

    return this.http.post(Links.INFLUNCERREGISTER, data).pipe(map((response: any) => response));
  }

  verifyOrganisation(user) {

    console.log('organisation verify', user);
    const data = {
      organizationName: user
    };
    console.log(data);

    return this.http.post(Links.VERIFYORGANISATION, data).pipe(map((response: any) => response));
  }

  createOrganisation(user) {

    console.log('organisation creation', user);
    const data = {
      organizationName: user.name,
      organizationKey: user.orgKey,
      organizationEmail: user.email,
      organizationpwd: this.setEncrypt(this.encryptSecretKey, user.password.trim())
    };

    console.log(data);

    return this.http.post(Links.CREATEORGANISATION, data).pipe(map((response: any) => response));
  }

  verifyOtp(email, otp) {

    console.log('verify otp ser', email, otp);
    const data = {
      'organizationEmail': email,
      'emailOtp': otp
    };

    console.log(data);

    return this.http.post(Links.OTPVERIFY, data).pipe(map((response: any) => response));
  }

  resendOtp(val) {

    console.log('resend otp ser', val);
    const data = {
      'organizationEmail': val
    };

    console.log(data);

    return this.http.post(Links.RESENDOTP, data).pipe(map((response: any) => response));
  }
  forgetPass(user, email) {

    console.log('Reset', email, user);
    const data = {
      'emailId': email,
      'userType': user
    };

    console.log(data);

    return this.http.post(Links.FORGETPASS, data).pipe(map((response: any) => response));
  }
  resetPass(pass, email, ut) {

    console.log('Reset', email, pass);
    const data = {
      'emailId': email,
      'userType': ut,
      'password': this.setEncrypt(this.encryptSecretKey, pass.trim())
    };

    console.log(data);

    return this.http.post(Links.RESETPASS, data).pipe(map((response: any) => response));
  }
  logout() {
    // localStorage.removeItem('survey');
    // localStorage.removeItem('user');
    localStorage.clear();
  }

}
