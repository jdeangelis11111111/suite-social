import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
declare let paypal: any;
@Component({
  selector: 'app-brand-payment',
  templateUrl: './brand-payment.component.html',
  styleUrls: ['./brand-payment.component.scss']
})
export class BrandPaymentComponent implements OnInit, AfterViewChecked {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 1;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AfJ8yyaSaAhWFdhJkzNf6zJ9CdGV1hlX3XOcJQxYVFOnw_TxnPr5t2OeLTzyruQFzY-RJkGlzw78NInC',
      // production: '<your-production-key-here>' //AQZHABi81H4gyQygoesxnMvQuvPGD8t-FPD-4Gb4A8MH_HdpvUrl841lGQBQL_ze4kHun-Gwz-8djSew
    },
    style: {
      label: 'paypal',
      layout: 'horizontal',
      fundingicons: 'true'
    },
    /* funding: {
      allowed: [paypal.FUNDING.CARD],
      disallowed: [paypal.FUNDING.CREDIT],
      allowed:[paypal.FUNDING.VENMO]
    }, */
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        //redirect after payment successful
        alert('Payment Successful');
        this.router.navigate(['/content/brand'])
        console.log(payment, data, 'ok', data.paymentID, data.payerID);
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
}
