import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router, ActivatedRoute } from '@angular/router';
import { InfluencerService } from 'app/services/influencer.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  showSuccess: boolean;
  finalAmount: number;
  taxamount: number = 0;
  payableAmount: number = 0;
  paymentData: any;
  email: string;
  toEmail: string;
  ut: any;
  constructor(private zone: NgZone, private router: Router, private service: InfluencerService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, ) {
    this.email = localStorage.getItem('email');
    this.ut = localStorage.getItem('userType');
    this.toEmail = this.route.snapshot.queryParamMap.get('email');
    console.log('toEmail', this.toEmail);
  }
  public payPalConfig?: IPayPalConfig;

  ngOnInit(): void {
    this.initConfig();


  }
  test = 'AfJ8yyaSaAhWFdhJkzNf6zJ9CdGV1hlX3XOcJQxYVFOnw_TxnPr5t2OeLTzyruQFzY-RJkGlzw78NInC'
  private initConfig(): void {
    // this.taxamount = this.finalAmount * 0.03;
    // this.payableAmount = this.finalAmount + this.taxamount;

    console.log(this.finalAmount, 'tax: 3%', this.taxamount, this.payableAmount);
    this.payPalConfig = {
      currency: 'USD',
      clientId: this.test,
      createOrderOnClient: (data) => <ICreateOrderRequest><unknown>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.payableAmount,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.payableAmount
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',

                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: this.payableAmount,
                },
              },

            ],
            payee: { email_address: "shivani.agrawalseller02@gmail.com", merchant_id: "B3WVNT4LSMWDW"},
            /*  shipping: {
               address: { address_line_1: "1 Main St", admin_area_2: "San Jose", admin_area_1: "CA", postal_code: "95131", country_code: "US" },
               name: { full_name: "Shivi Agrawal" }
             } */
          },

        ]
      },

      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },

      onApprove: (data, actions) => {
        console.log(this.payPalConfig.clientId);
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        console.log('id', data);
        this.paymentData = data;

        this.showSuccess = true;
        console.log('orderid:', this.paymentData.id, 'paymentid:', this.paymentData.purchase_units[0].payments.captures[0].id);
        this.service.payment(this.email, this.toEmail, this.ut, this.finalAmount, 3.0, this.taxamount, this.payableAmount, this.paymentData.id, this.paymentData.purchase_units[0].payments.captures[0].id, this.paymentData.status).subscribe(Resp => {
          console.log(Resp);

        })
        alert('Payment Successful');
        if (this.ut == 2)
          this.zone.run(() => { this.router.navigate(['/content/influencer/transList'], { queryParams: { t: 'list' } }) })
        // this.router.navigate(['/content/influencer/transList'], { queryParams: { t: 'list' } })
        else
          this.zone.run(() => { this.router.navigate(['/content/brand/transList'], { queryParams: { t: 'list' } }) })
        // this.router.navigate(['/content/brand/transList'], { queryParams: { t: 'list' } })
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log(this.taxamount, this.payableAmount, this.finalAmount);
        console.log('onClick', data, actions);
      },
    };
  }
  amountChange(finalAmount) {
    console.log(finalAmount);
    if (finalAmount == '')
      finalAmount = 0;
    finalAmount = parseInt(finalAmount)
    this.taxamount = finalAmount * 0.03;
    this.taxamount = parseFloat(this.taxamount.toFixed(2));
    console.log(this.taxamount);

    this.payableAmount = finalAmount + this.taxamount;
    console.log('Change in amount', finalAmount, typeof (finalAmount), this.taxamount, typeof (this.taxamount), this.payableAmount);
    this.cdRef.detectChanges();

  }
  _keyPressDec(event) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }
}