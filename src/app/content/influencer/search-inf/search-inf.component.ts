import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar, MatSidenav, MatDialog } from '@angular/material';
import { Product } from '../../../shared/models/product.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { InfluencerService } from 'app/services/influencer.service';
import { InfCardComponent } from './../inf-card/inf-card.component';
import { Router } from '@angular/router';
export interface categ {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-search-inf',
  templateUrl: './search-inf.component.html',
  styleUrls: ['./search-inf.component.scss']
})
export class SearchInfComponent implements OnInit {
  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public currentPage: any;
  @ViewChild(MatSidenav, { static: false }) private sideNav: MatSidenav;

  public products$: Observable<Product[]>;
  public categories$: Observable<any>;
  public activeCategory: string = 'all';
  public filterForm: FormGroup;
  public topicForm: FormGroup;
  // public cart: CartItem[];
  public cartData: any;
  brands: any;
  filteredItems: any;
  topic: any[];
  other: any;
  opts = ['Beauty', 'Food', 'Fashion', 'Kids', 'Travel', 'Sports/Fitness', 'Health/Wellness', 'Pets', 'Travel (Including Hotel)', 'Families', 'Others']
  budget = ['< 20k', '20k - 50k', '50k - 1 lac', '1 lac - 1.5 lac'];
  rating: categ[] = [{ value: '1', viewValue: 'star' }, { value: '2', viewValue: 'star2' }, { value: '3', viewValue: 'star3' }, { value: '4', viewValue: 'star4' }, { value: '5', viewValue: 'star5' }]
  budgets = 0;
  searched: any;
  showNoRecords: boolean;
  isModuleLoading = false;
  rate = 0;
  rateForm: FormGroup;
  constructor(
    /*  private shopService: ShopService, */private formBuilder: FormBuilder,
    private fb: FormBuilder, public dialog: MatDialog, private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar, public router: Router,
    private loader: AppLoaderService, private influencerService: InfluencerService
  ) {
    this.searched = ''; this.other = '';
    this.topic = []; this.showNoRecords = false;
    this.getInfs();
    this.topicForm = this.formBuilder.group({
      topic: ['']
    })
    this.rateForm = this.formBuilder.group({
      rate: ['']
    })
  }

  ngOnInit() {

  }
  getRate(rate) {
    console.log(rate);
    this.rate = rate.value;

  }
  getInfs() {
    this.influencerService.viewSearchBrands('', [], this.rate, '', 0, 10).subscribe(Resp => {
      console.log(Resp);
      if (Resp.response == "200") {
        this.brands = Resp.object;
        this.cdRef.detectChanges();
        // this.brands = [{ "categoryId": 1, "catName": "Anaemia", "description": "A condition in which there is a deficiency of red cells or of hemoglobin in the blood, resulting in pallor and weariness.", "imge1": "http://36.255.3.15:8092/cpIMG/1_anaemia.png", "date": null, "lastEdit": 1570098490000, "isImage": null }, { "categoryId": 2, "catName": "Arthritis", "description": "Arthritis is an inflammation of the joints. It can affect one joint or multiple joints. There are more than 100 different types of arthritis, with different causes and treatment methods.", "imge1": "http://36.255.3.15:8092/cpIMG/2_arthritis.png", "date": 1565218343000, "lastEdit": null, "isImage": null }, { "categoryId": 3, "catName": "Asthama", "description": "Asthma is a chronic disease of the airways that makes breathing difficult. With asthma, there is inflammation of the air passages that results in a temporary narrowing of the airways that carry oxygen to the lungs.", "imge1": "http://36.255.3.15:8092/cpIMG/3_asthma.png", "date": 1565218343000, "lastEdit": null, "isImage": null }, { "categoryId": 4, "catName": "Child Care", "description": "When kids need intensive health care after they're discharged from the hospital, it's important that family and caregivers learn about the devices, equipment, and support they'll need", "imge1": "http://36.255.3.15:8092/cpIMG/4_child.png", "date": 1565218343000, "lastEdit": 1566214942000, "isImage": null }, { "categoryId": 5, "catName": "Chronic Ailments", "description": "A disease that persists for a long time. Chronic disease is one lasting 3 months or more, by the definition of the U.S. National Center for Health Statistics.", "imge1": "http://36.255.3.15:8092/cpIMG/5_chronic.png", "date": 1565218343000, "lastEdit": null, "isImage": null }, { "categoryId": 6, "catName": "Diabetes", "description": "Diabetes is a disease that occurs when your blood glucose, also called blood sugar, is too high. Blood glucose is your main source of energy and comes from the food you eat.", "imge1": "http://36.255.3.15:8092/cpIMG/6_diabetes.png", "date": 1565218343000, "lastEdit": null, "isImage": null }, { "categoryId": 7, "catName": "Doctors Speak", "description": "If you want to understand the culture of medicine, you should pay attention to how doctors and other health professionals talk,\\\" says Brian Goldman, MD. He was interviewed by MedPage Today", "imge1": "http://36.255.3.15:8092/cpIMG/7_speak.png", "date": 1565218343000, "lastEdit": null, "isImage": null }, { "categoryId": 8, "catName": "Health Today", "description": "Health can be defined as physical, mental, and social wellbeing, and as a resource for living a full life", "imge1": "http://36.255.3.15:8092/cpIMG/8_health.png", "date": 1565218343000, "lastEdit": null, "isImage": null }, { "categoryId": 9, "catName": "Home Remedies", "description": "A Home remedy is defined as a simply prepared medication or tonic often of unproven effectiveness administered without prescription or professional supervision.", "imge1": "http://36.255.3.15:8092/cpIMG/9_ayurvedic.png", "date": 1565218343000, "lastEdit": null, "isImage": null }, { "categoryId": 10, "catName": "Hypertention", "description": "Hypertension (high blood pressure) is defined as having a blood pressure reading of more than 140/90 mmHg over a number of weeks. Our blood pressures change all the time throughout the day.", "imge1": "http://36.255.3.15:8092/cpIMG/10_hypertension.png", "date": 1565218343000, "lastEdit": 1566205016000, "isImage": null }]
        // this.assignCopy();
      }
    }, error => {
      console.log(error);
      this.cdRef.detectChanges();
    })
  }
  assignCopy() {
    this.filteredItems = Object.assign([], this.brands);
  }
  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.brands).filter(
      item => item.catName.toLowerCase().indexOf(value.toLowerCase()) > -1//problem in item.head change 
    )
  }
  topics(eve, e, indexVal) {
    console.log(eve, e)
    if (eve.target.checked == true) {
      if (e == 'Others') {
        console.log('others');
        // this.topic.push(this.topicForm.value.topic);
      }
      else
        this.topic.push(e);
    }
    else {
      for (let i = 0; i < this.topic.length; i++) {
        if (this.topic[i] == e)
          this.topic.splice(i, 1);
      }
    }
    console.log(this.topic)
  }
  budgetA(eve, e, indexVal) {

    /*  if (eve.target.checked == true) {
       this.budgets.push(e);
     }
     else {
       for (let i = 0; i < this.budgets.length; i++) {
         if (this.budgets[i] == e)
           this.budgets.splice(i, 1);
       }
     }
     console.log(this.budgets) */
  }
  applyFilter(e) {
    console.log(e);
    this.searched = e;

  }
  _keyPressDec(event: any) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
    console.log(event)
    this.budgets = event.target.value;
  }
  check() {
    this.isModuleLoading = true;
    if (this.topic.indexOf(this.topicForm.value.topic) > -1) {
      console.log('present');
    }
    else {
      console.log('absent');
      if (this.topicForm.value.topic != '')
        this.topic.push(this.topicForm.value.topic);
    }
    console.log(this.searched, this.topic, this.budgets);
    this.influencerService.viewSearchBrands(this.searched, this.topic, this.rate, this.budgets, 0, 10).subscribe(Resp => {
      console.log('Resp', Resp);
      if (Resp.response == '200') {
        this.brands = Resp.object;
        this.showNoRecords = false;
        this.cdRef.detectChanges();
        // this.resultsLength = Resp.object.count;
      }
      else {
        console.log('here')
        this.brands = [];
        this.showNoRecords = true;
        this.cdRef.detectChanges();
      }
    })
  }
  sendMsg(email) {
    const dialogApp = this.dialog.open(InfCardComponent, {
      height: '530px',
      width: '637px',
      disableClose: true,
      data: { 'type': 'msg', 'email': email }
    });
    dialogApp.afterClosed().subscribe(result => {

    });
  }
  review(email) {
    const dialogApp = this.dialog.open(InfCardComponent, {
      height: '467px',
      width: '700px',
      disableClose: true,
      data: { 'type': 'review', 'email': email }
    });
    dialogApp.afterClosed().subscribe(result => {

    });
  }
  clearFilter(star) {
    console.log(star);
    this.rate = 0;
    // document.getElementById('st')=undefined;
    this.getInfs();
  }
  pay(email) {
    this.router.navigate(['/content/influencer/payment'], { queryParams: { email: email } })
  }
}


