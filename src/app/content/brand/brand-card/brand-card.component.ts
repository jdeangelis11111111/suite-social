import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'app/services/brand.service';
// import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'app/services/login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
export interface DialogData {
  type: string;
  email: string;
}
export interface categ {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent implements OnInit {
  brandSurveyForm: FormGroup;
  opts = ['Beauty', 'Food', 'Fashion', 'Kids', 'Travel', 'Sports/Fitness', 'Health/Wellness', 'Pets', 'Travel (Including Hotel)', 'Families', 'Others']
  // ages = ['below 20', '20 - 30', '30 - 40', '40 and above'];
  platforms = ['Youtube', 'Instagram', 'Facebook', 'Twitter', 'Blog', 'Others'];
  coms = ['Phone Call', 'Email'];
  ages: categ[] = [
    { value: '< 20', viewValue: 'below 20' },
    { value: '20 - 30', viewValue: '20 - 30' },
    { value: '30 - 40', viewValue: '30 - 40' },
    { value: '> 40', viewValue: 'above 40' }
  ];
  somee: any; rating: any = 0
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  messageForm: FormGroup;
  reviewForm: FormGroup;
  email: string;
  dis = false;
  postCForm: FormGroup;
  maxDate = new Date();
  image1: any;
  imgURL: any;
  imagePath: any;

  image2: any;
  imgURL1: any;
  imagePath1: any;

  image3: any;
  imgURL2: any;
  imagePath2: any;

  image4: any;
  imgURL3: any;
  imagePath3: any;

  image5: any;
  imgURL4: any;
  imagePath4: any;
  count: number;
  file: any[];
  dis2 = false;
  constructor(public dialogRef: MatDialogRef<BrandCardComponent>, public snackBar: MatSnackBar, private formBuilder: FormBuilder, private brandService: BrandService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.file = []
    this.count = 0;
    const Regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    this.brandSurveyForm = this.formBuilder.group({
      name: ['', Validators.required],
      cName: ['', Validators.required],
      categPro: ['', /* Validators.required */],
      budget: ['', /* Validators.required */],
      hireInf: ['', /* Validators.required */],
      desc: ['', /* Validators.required */],
      age: ['', /* Validators.required */],
      platform: ['', /* Validators.required */],
      timeline: ['', /* Validators.required */],
      // email: ['', [Validators.required, Validators.pattern(Regex)]],
      mobile: ['', Validators.required],
      communicate: ['', /* Validators.required */],
      copy: []
    });
    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    })

    this.reviewForm = this.formBuilder.group({
      review: ['',],
      rate: ['', Validators.required]
    })
    this.postCForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
    var a = localStorage.getItem('survey');
    if (a == 'true')
      this.somee = a
    else
      this.somee = false;
    console.log('here', a, this.somee)

  }
  ngOnInit() {
    this.email = localStorage.getItem('email');
    console.log(this.email);
  }
  submitSurvey() {
    var userId = localStorage.getItem('user');
    console.log('here', this.brandSurveyForm.value, userId, this.brandSurveyForm.invalid);
    if (!this.brandSurveyForm.invalid && this.brandSurveyForm.value.name.trim() != '' && this.brandSurveyForm.value.cName.trim() != '' && this.brandSurveyForm.value.mobile.trim() != '') {
      this.brandService.submitBrandForm(this.brandSurveyForm.value, this.email, userId).subscribe(Resp => {
        if (Resp.response == 200) {
          console.log('Resp', Resp);
          this.openSnackBar('Sucessfully Saved');
          localStorage.setItem('survey', 'true')
          this.onNoClick();
          // this.toastr.success('Survey Completed Successfully');
          this.somee = true;
        }
        else {
          this.openSnackBar(Resp.message);
          // this.toastr.success('Please fill all the fields with *');
        }
      }, error => {
        this.openSnackBar(error.message);
        // this.toastr.success('Please fill all the fields with *');
      })
    }
    else {
      this.openSnackBar('Please fill all the fields with *');
      // this.toastr.success('Please fill all the fields with *');
    }
  }
  _keyPressDec(event: any) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }
  onClick(v) {
    console.log('here', v)
    this.rating = v;
  }
  rate() {
    this.brandService.rateInf(this.email, this.rating, this.data.email, this.reviewForm.value.review).subscribe(rateResp => {
      if (rateResp.response == 200) {
        this.openSnackBar('Influencer rating completed');
        this.dialogRef.close();
      }
      else {
        this.openSnackBar1('Influencer rating failed');

      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBar(message) {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openSnackBar1(message) {
    this.snackBar.open(message, 'Please Try Again', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  sendMsg() {
    this.dis = true;
    console.log(this.messageForm.value);

    this.brandService.sendMsg(this.messageForm.value, this.email, this.data.email).subscribe(Respon => {
      console.log(Respon);
      if (Respon.response == 200) {
        this.openSnackBar('Message sent successfully');
        this.dialogRef.close();
      }
      else {
        this.dis = false;
        this.openSnackBar1('Failed to send Message');
      }
    }, error => {
      this.dis = false;
      this.openSnackBar1('Failed to send Message');
      console.log(error);

    })
  }
  postCampaign() {
    this.file = []
    this.dis2 = true;
    console.log(this.postCForm.value);
    if (this.image1 != undefined)
      this.file.push(this.image1);
    if (this.image2 != undefined)
      this.file.push(this.image2);
    if (this.image3 != undefined)
      this.file.push(this.image3);
    if (this.image4 != undefined)
      this.file.push(this.image4);
    if (this.image5 != undefined)
      this.file.push(this.image5);

    if (this.count > 0) {
      this.brandService.postCamp(this.postCForm.value, this.email, this.file).subscribe(Respon => {
        console.log(Respon);
        if (Respon.response == 200) {
          this.openSnackBar('Campaign addition successful');
          this.dialogRef.close();
        }
        else {
          this.dis2 = false;
          this.openSnackBar1('Failed to add campaign');
        }
      }, error => {
        this.dis2 = false;
        this.openSnackBar1('Failed to add campaign');
        console.log(error);

      })
    }
    else {
      this.dis2 = false;
      console.log('No image selected', this.count);
      this.openSnackBar('Please select atleast 1 image');
    }
  }
  preview(files) {
    console.log(this.image1);

    if (this.image1 != undefined) {
      console.log('here', this.count);
    }
    else {
      this.count++;
      console.log('else here', this.count);
    }
    // this.showImg = false;
    console.log(files);

    if (files.length === 0) {
      this.image1 = undefined;
      console.log(this.image1);
      this.imgURL = "false";
      return;
    }


    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      this.openSnackBar('Only images are supported');
      // this.img1 = true;
      return;
    }
    else {

    }
    var reader = new FileReader();
    this.imagePath = files;
    console.log('files', files)
    if (files.length != 0) {
      this.image1 = this.imagePath[0];
      console.log(this.image1);
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }

  }
  preview1(files) {
    // this.showImg = false;
    console.log(files);
    if (this.image2 != undefined) {
      console.log('here', this.count);
    }
    else {
      this.count++;
      console.log('else here', this.count);
    }
    if (files.length === 0) {
      this.image2 = undefined;
      console.log(this.image1);
      this.imgURL1 = "false";
      return;
    }


    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      this.openSnackBar('Only images are supported');
      // this.img1 = true;
      return;
    }
    else {

    }
    var reader = new FileReader();
    this.imagePath1 = files;
    console.log('files', files)
    if (files.length != 0) {
      this.image2 = this.imagePath1[0];
      console.log(this.image2);
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL1 = reader.result;
      }
    }

  }
  preview2(files) {
    // this.showImg = false;
    console.log(files);
    if (this.image3 != undefined) {
      console.log('here', this.count);
    }
    else {
      this.count++;
      console.log('else here', this.count);
    }
    if (files.length === 0) {
      this.image3 = undefined;
      console.log(this.image1);
      this.imgURL2 = "false";
      return;
    }


    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      this.openSnackBar('Only images are supported');
      // this.img1 = true;
      return;
    }
    else {

    }
    var reader = new FileReader();
    this.imagePath2 = files;
    console.log('files', files)
    if (files.length != 0) {
      this.image3 = this.imagePath2[0];
      console.log(this.image3);
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL2 = reader.result;
      }
    }

  }
  preview3(files) {
    // this.showImg = false;
    console.log(files);
    if (this.image4 != undefined) {
      console.log('here', this.count);
    }
    else {
      this.count++;
      console.log('else here', this.count);
    }
    if (files.length === 0) {
      this.image4 = undefined;
      console.log(this.image4);
      this.imgURL3 = "false";
      return;
    }


    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      this.openSnackBar('Only images are supported');
      // this.img1 = true;
      return;
    }
    else {

    }
    var reader = new FileReader();
    this.imagePath3 = files;
    console.log('files', files)
    if (files.length != 0) {
      this.image4 = this.imagePath3[0];
      console.log(this.image3);
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL3 = reader.result;
      }
    }

  }
  preview4(files) {
    // this.showImg = false;
    console.log(files);
    if (this.image5 != undefined) {
      console.log('here', this.count);
    }
    else {
      this.count++;
      console.log('else here', this.count);
    }
    if (files.length === 0) {
      this.image5 = undefined;
      console.log(this.image5);
      this.imgURL4 = "false";
      return;
    }


    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      this.openSnackBar('Only images are supported');
      // this.img1 = true;
      return;
    }
    else {

    }
    var reader = new FileReader();
    this.imagePath4 = files;
    console.log('files', files)
    if (files.length != 0) {
      this.image5 = this.imagePath4[0];
      console.log(this.image5);
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL4 = reader.result;
      }
    }

  }
  removeItem(num) {
    if (num == 1)
      this.imgURL = undefined;
    else if (num == 2)
      this.imgURL1 = undefined;
    else if (num == 3)
      this.imgURL2 = undefined;
    else if (num == 4)
      this.imgURL3 = undefined;
    else if (num == 5)
      this.imgURL4 = undefined;

  }
}