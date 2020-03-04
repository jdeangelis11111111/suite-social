import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  mailText:string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.mailText = 'mailto:jdeangelis@suitesocialenterprise.com'
  }
  toLogIn() {
    this.router.navigate(['login']);
  }
}
