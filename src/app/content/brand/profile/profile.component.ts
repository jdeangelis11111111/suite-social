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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  brandSurveyForm: FormGroup;
  somee: any;
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
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  email: string;
  data: any;
  constructor(public snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder, private brandService: BrandService, ) {
    this.email = localStorage.getItem('email');
    this.brandService.getBrand(this.email).subscribe(Resp => {

      this.data = Resp.list[0];
      console.log(Resp, this.data);
      if (this.data.copyOfResponse == 'no')
        var copy = false
      else
        copy = true;
      this.brandSurveyForm.patchValue({
        name: this.data.yourName,
        cName: this.data.yourcompanyName,
        budget: this.data.overallBudget,
        categPro: this.data.productCategory,
        hireInf: this.data.noOfInfluencer,
        desc: this.data.describeYourBrand,
        age: this.data.ageForCampaign,
        platform: this.data.socialMediaPlatform,
        timeline: this.data.yourCampaignTimeline,
        mobile: this.data.yourPhoneNumber,
        communicate: this.data.methodOfCommunication,
        copy: copy
      })
      for (let i = 0; i < this.platforms.length; i++) {
        if (this.data.socialMediaPlatform != this.platforms[i]) {
          this.brandSurveyForm.patchValue({
            platformO: this.data.socialMediaPlatform
          })
        }
        else {
          console.log('else', this.data.socialMediaPlatform, this.platforms[i]);
          this.brandSurveyForm.patchValue({
            platformO: ''
          })
          break;
        }

      }
      for (let i = 0; i < this.opts.length; i++) {
        if (this.data.productCategory != this.opts[i]) {
          this.brandSurveyForm.patchValue({
            categProO: this.data.productCategory
          })
        }
        else {
          console.log('else', this.data.productCategory, this.opts[i]);
          this.brandSurveyForm.patchValue({
            categProO: ''
          })
          break;
        }

      }
    })
    this.brandSurveyForm = this.formBuilder.group({
      name: ['', Validators.required],
      cName: ['', Validators.required],
      categPro: ['', /* Validators.required */],
      categProO: [''],
      budget: ['', /* Validators.required */],
      hireInf: ['', /* Validators.required */],
      desc: ['', /* Validators.required */],
      age: ['', /* Validators.required */],
      platform: ['', /* Validators.required */],
      timeline: ['', /* Validators.required */],
      // email: ['', [Validators.required, Validators.pattern(Regex)]],
      mobile: ['', Validators.required],
      communicate: ['', /* Validators.required */],
      platformO: [''],
      copy: []
    });
  }

  ngOnInit() {

  }
  updateSurvey() {
    var userId = localStorage.getItem('user');
    var survey = localStorage.getItem('survey');
    console.log('here', this.brandSurveyForm.value, userId, this.brandSurveyForm.invalid);
    if (survey == 'true') {
      if (!this.brandSurveyForm.invalid && this.brandSurveyForm.value.name.trim() != '' && this.brandSurveyForm.value.cName.trim() != '' && this.brandSurveyForm.value.mobile.trim() != '') {
        this.brandService.updateBrandForm(this.brandSurveyForm.value, this.email, userId).subscribe(Resp => {
          if (Resp.response == 200) {
            console.log('Resp', Resp);
            this.openSnackBar('Sucessfully Updated');
            // this.toastr.success('Survey Completed Successfully');
            this.somee = true;
            this.router.navigate(['content/brand']);
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
    else {
      console.log('Add here');

      this.addProfile(userId)
    }
  }
  addProfile(userId) {
    if (!this.brandSurveyForm.invalid && this.brandSurveyForm.value.name.trim() != '' && this.brandSurveyForm.value.cName.trim() != '' && this.brandSurveyForm.value.mobile.trim() != '') {
      this.brandService.submitBrandForm(this.brandSurveyForm.value, this.email, userId).subscribe(Resp => {
        if (Resp.response == 200) {
          console.log('Resp', Resp);
          this.openSnackBar('Sucessfully Saved');
          localStorage.setItem('survey', 'true')
          this.somee = true;
          this.router.navigate(['content/brand']);
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
  openSnackBar(message) {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
