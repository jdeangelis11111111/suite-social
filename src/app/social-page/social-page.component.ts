import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.scss']
})
export class SocialPageComponent implements OnInit, AfterViewInit {
  socialLoginType: string;

  constructor(private signServe: LoginService, private route: Router) {
    const str = route.url;
    // const  pieces = str.split(/[\s/]+/);
    const pieces = str.split(/[\s/]+/);
    console.log(pieces[2]);
    this.socialLoginType = pieces[2];

  }

  ngOnInit() {

  }

  ngAfterViewInit() { }
}
