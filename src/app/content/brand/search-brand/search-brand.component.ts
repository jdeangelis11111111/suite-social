import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar, MatSidenav, MatDialog } from '@angular/material';
// import { ShopService, CartItem } from '../shop.service';
import { Product } from '../../../shared/models/product.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { BrandService } from 'app/services/brand.service';
import { BrandCardComponent } from '../brand-card/brand-card.component';
import { ActivatedRoute, Router } from '@angular/router';
export interface categ {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-search-brand',
  templateUrl: './search-brand.component.html',
  styleUrls: ['./search-brand.component.scss'],
  animations: [egretAnimations]
})

export class SearchBrandComponent implements OnInit {
  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public currentPage: any;
  @ViewChild(MatSidenav, { static: false }) private sideNav: MatSidenav;

  public products$: Observable<Product[]>;
  public categories$: Observable<any>;
  public activeCategory: string = 'all';
  public filterForm: FormGroup;
  // public cart: CartItem[];
  public cartData: any;
  influencers: any;
  filteredItems: any;
  // range = ['< 2k', '2k - 5k', '5k - 10k', '10k - 20k', '20k - 100k', '> 100k']
  range: categ[] = [
    { value: '< 2k', viewValue: '< 2k' },
    { value: '2k - 5k', viewValue: '2k - 5k' },
    { value: '5k - 10k', viewValue: '5k - 10k' },
    { value: '10k - 20k', viewValue: '10k - 20k' },
    { value: '20k - 100k', viewValue: '20k - 100k' },
    { value: '> 100k', viewValue: '> 100k' }
  ];
  ages: categ[] = [
    { value: '< 20', viewValue: 'below 20' },
    { value: '20 - 30', viewValue: '20 - 30' },
    { value: '30 - 40', viewValue: '30 - 40' },
    { value: '> 40', viewValue: 'above 40' }
  ];
  opts = ['Beauty', 'Food', 'Fashion', 'Kids', 'Travel', 'Sports/Fitness', 'Health/Wellness', 'Pets', 'Travel (Including Hotel)', 'Families', 'Others']
  rating: categ[] = [{ value: '1', viewValue: 'star' }, { value: '2', viewValue: 'star2' }, { value: '3', viewValue: 'star3' }, { value: '4', viewValue: 'star4' }, { value: '5', viewValue: 'star5' }]
  platforms = ['Youtube', 'Instagram', 'Facebook', 'Twitter', 'Blog'];
  budget = ['< 20k', '20k - 50k', '50k - 1 lac', '1 lac - 1.5 lac'];
  cit = ["New York",
    "Buffalo",
    "Rochester",
    "Yonkers",
    "Syracuse",
    "Albany",
    "New Rochelle",
    "Mount Vernon",
    "Schenectady",
    "Utica",
    "White Plains",
    "Hempstead",
    "Troy",
    "Niagara Falls",
    "Binghamton",
    "Freeport",
    "Valley Stream"]
  citCal = ["Los Angeles",
    "San Diego",
    "San Jose",
    "San Francisco",
    "Fresno",
    "Sacramento",
    "Long Beach",
    "Oakland",
    "Bakersfield",
    "Anaheim",
    "Santa Ana",
    "Riverside",
    "Stockton",
    "Chula Vista",
    "Irvine",
    "Fremont",
    "San Bernardino",
    "Modesto",
    "Fontana",
    "Oxnard",
    "Moreno Valley",
    "Huntington Beach",
    "Glendale",
    "Santa Clarita",
    "Garden Grove",
    "Oceanside",
    "Rancho Cucamonga",
    "Santa Rosa",
    "Ontario",
    "Lancaster",
    "Elk Grove",
    "Corona",
    "Palmdale",
    "Salinas",
    "Pomona",
    "Hayward",
    "Escondido",
    "Torrance",
    "Sunnyvale",
    "Orange",
    "Fullerton",
    "Pasadena",
    "Thousand Oaks",
    "Visalia",
    "Simi Valley",
    "Concord",
    "Roseville",
    "Victorville",
    "Santa Clara",
    "Vallejo",
    "Berkeley",
    "El Monte",
    "Downey",
    "Costa Mesa",
    "Inglewood",
    "Carlsbad",
    "San Buenaventura (Ventura)",
    "Fairfield",
    "West Covina",
    "Murrieta",
    "Richmond",
    "Norwalk",
    "Antioch",
    "Temecula",
    "Burbank",
    "Daly City",
    "Rialto",
    "Santa Maria",
    "El Cajon",
    "San Mateo",
    "Clovis",
    "Compton",
    "Jurupa Valley",
    "Vista",
    "South Gate",
    "Mission Viejo",
    "Vacaville",
    "Carson",
    "Hesperia",
    "Santa Monica",
    "Westminster",
    "Redding",
    "Santa Barbara",
    "Chico",
    "Newport Beach",
    "San Leandro",
    "San Marcos",
    "Whittier",
    "Hawthorne",
    "Citrus Heights",
    "Tracy",
    "Alhambra",
    "Livermore",
    "Buena Park",
    "Menifee",
    "Hemet",
    "Lakewood",
    "Merced",
    "Chino",
    "Indio",
    "Redwood City",
    "Lake Forest",
    "Napa",
    "Tustin",
    "Bellflower",
    "Mountain View",
    "Chino Hills",
    "Baldwin Park",
    "Alameda",
    "Upland",
    "San Ramon",
    "Folsom",
    "Pleasanton",
    "Union City",
    "Perris",
    "Manteca",
    "Lynwood",
    "Apple Valley",
    "Redlands",
    "Turlock",
    "Milpitas",
    "Redondo Beach",
    "Rancho Cordova",
    "Yorba Linda",
    "Palo Alto",
    "Davis",
    "Camarillo",
    "Walnut Creek",
    "Pittsburg",
    "South San Francisco",
    "Yuba City",
    "San Clemente",
    "Laguna Niguel",
    "Pico Rivera",
    "Montebello",
    "Lodi",
    "Madera",
    "Santa Cruz",
    "La Habra",
    "Encinitas",
    "Monterey Park",
    "Tulare",
    "Cupertino",
    "Gardena",
    "National City",
    "Rocklin",
    "Petaluma",
    "Huntington Park",
    "San Rafael",
    "La Mesa",
    "Arcadia",
    "Fountain Valley",
    "Diamond Bar",
    "Woodland",
    "Santee",
    "Lake Elsinore",
    "Porterville",
    "Paramount",
    "Eastvale",
    "Rosemead",
    "Hanford",
    "Highland",
    "Brentwood",
    "Novato",
    "Colton",
    "Cathedral City",
    "Delano",
    "Yucaipa",
    "Watsonville",
    "Placentia",
    "Glendora",
    "Gilroy",
    "Palm Desert",
    "Cerritos",
    "West Sacramento",
    "Aliso Viejo",
    "Poway",
    "La Mirada",
    "Rancho Santa Margarita",
    "Cypress",
    "Dublin",
    "Covina",
    "Azusa",
    "Palm Springs",
    "San Luis Obispo",
    "Ceres",
    "San Jacinto",
    "Lincoln",
    "Newark",
    "Lompoc",
    "El Centro",
    "Danville",
    "Bell Gardens",
    "Coachella",
    "Rancho Palos Verdes",
    "San Bruno",
    "Rohnert Park",
    "Brea",
    "La Puente",
    "Campbell",
    "San Gabriel",
    "Beaumont",
    "Morgan Hill",
    "Culver City",
    "Calexico",
    "Stanton",
    "La Quinta",
    "Pacifica",
    "Montclair",
    "Oakley",
    "Monrovia",
    "Los Banos",
    "Martinez"]
  cityIli = ["Chicago",
    "Aurora",
    "Rockford",
    "Joliet",
    "Naperville",
    "Springfield",
    "Peoria",
    "Elgin",
    "Waukegan",
    "Cicero",
    "Champaign",
    "Bloomington",
    "Arlington Heights",
    "Evanston",
    "Decatur",
    "Schaumburg",
    "Bolingbrook",
    "Palatine",
    "Skokie",
    "Des Plaines",
    "Orland Park",
    "Tinley Park",
    "Oak Lawn",
    "Berwyn",
    "Mount Prospect",
    "Normal",
    "Wheaton",
    "Hoffman Estates",
    "Oak Park",
    "Downers Grove",
    "Elmhurst",
    "Glenview",
    "DeKalb",
    "Lombard",
    "Belleville",
    "Moline",
    "Buffalo Grove",
    "Bartlett",
    "Urbana",
    "Quincy",
    "Crystal Lake",
    "Plainfield",
    "Streamwood",
    "Carol Stream",
    "Romeoville",
    "Rock Island",
    "Hanover Park",
    "Carpentersville",
    "Wheeling",
    "Park Ridge",
    "Addison",
    "Calumet City"];
  citTexas = ["Houston",
    "San Antonio",
    "Dallas",
    "Austin",
    "Fort Worth",
    "El Paso",
    "Arlington",
    "Corpus Christi",
    "Plano",
    "Laredo",
    "Lubbock",
    "Garland",
    "Irving",
    "Amarillo",
    "Grand Prairie",
    "Brownsville",
    "Pasadena",
    "McKinney",
    "Mesquite",
    "McAllen",
    "Killeen",
    "Frisco",
    "Waco",
    "Carrollton",
    "Denton",
    "Midland",
    "Abilene",
    "Beaumont",
    "Round Rock",
    "Odessa",
    "Wichita Falls",
    "Richardson",
    "Lewisville",
    "Tyler",
    "College Station",
    "Pearland",
    "San Angelo",
    "Allen",
    "League City",
    "Sugar Land",
    "Longview",
    "Edinburg",
    "Mission",
    "Bryan",
    "Baytown",
    "Pharr",
    "Temple",
    "Missouri City",
    "Flower Mound",
    "Harlingen",
    "North Richland Hills",
    "Victoria",
    "Conroe",
    "New Braunfels",
    "Mansfield",
    "Cedar Park",
    "Rowlett",
    "Port Arthur",
    "Euless",
    "Georgetown",
    "Pflugerville",
    "DeSoto",
    "San Marcos",
    "Grapevine",
    "Bedford",
    "Galveston",
    "Cedar Hill",
    "Texas City",
    "Wylie",
    "Haltom City",
    "Keller",
    "Coppell",
    "Rockwall",
    "Huntsville",
    "Duncanville",
    "Sherman",
    "The Colony",
    "Burleson",
    "Hurst",
    "Lancaster",
    "Texarkana",
    "Friendswood",
    "Weslaco"
  ];
  citPen = ["Philadelphia",
    "Pittsburgh",
    "Allentown",
    "Erie",
    "Reading",
    "Scranton",
    "Bethlehem",
    "Lancaster",
    "Harrisburg",
    "Altoona",
    "York",
    "State College",
    "Wilkes-Barre"];
  citAri = ["Phoenix",
    "Tucson",
    "Mesa",
    "Chandler",
    "Glendale",
    "Scottsdale",
    "Gilbert",
    "Tempe",
    "Peoria",
    "Surprise",
    "Yuma",
    "Avondale",
    "Goodyear",
    "Flagstaff",
    "Buckeye",
    "Lake Havasu City",
    "Casa Grande",
    "Sierra Vista",
    "Maricopa",
    "Oro Valley",
    "Prescott",
    "Bullhead City",
    "Prescott Valley",
    "Marana",
    "Apache Junction"];
  citFlo = ["Jacksonville",
    "Miami",
    "Tampa",
    "Orlando",
    "St. Petersburg",
    "Hialeah",
    "Tallahassee",
    "Fort Lauderdale",
    "Port St. Lucie",
    "Cape Coral",
    "Pembroke Pines",
    "Hollywood",
    "Miramar",
    "Gainesville",
    "Coral Springs",
    "Miami Gardens",
    "Clearwater",
    "Palm Bay",
    "Pompano Beach",
    "West Palm Beach",
    "Lakeland",
    "Davie",
    "Miami Beach",
    "Sunrise",
    "Plantation",
    "Boca Raton",
    "Deltona",
    "Largo",
    "Deerfield Beach",
    "Palm Coast",
    "Melbourne",
    "Boynton Beach",
    "Lauderhill",
    "Weston",
    "Fort Myers",
    "Kissimmee",
    "Homestead",
    "Tamarac",
    "Delray Beach",
    "Daytona Beach",
    "North Miami",
    "Wellington",
    "North Port",
    "Jupiter",
    "Ocala",
    "Port Orange",
    "Margate",
    "Coconut Creek",
    "Sanford",
    "Sarasota",
    "Pensacola",
    "Bradenton",
    "Palm Beach Gardens",
    "Pinellas Park",
    "Coral Gables",
    "Doral",
    "Bonita Springs",
    "Apopka",
    "Titusville",
    "North Miami Beach",
    "Oakland Park",
    "Fort Pierce",
    "North Lauderdale",
    "Cutler Bay",
    "Altamonte Springs",
    "St. Cloud",
    "Greenacres",
    "Ormond Beach",
    "Ocoee",
    "Hallandale Beach",
    "Winter Garden",
    "Aventura"];
  citInd = ["Indianapolis",
    "Fort Wayne",
    "Evansville",
    "South Bend",
    "Carmel",
    "Bloomington",
    "Fishers",
    "Hammond",
    "Gary",
    "Muncie",
    "Lafayette",
    "Terre Haute",
    "Kokomo",
    "Anderson",
    "Noblesville",
    "Greenwood",
    "Elkhart",
    "Mishawaka",
    "Lawrence",
    "Jeffersonville",
    "Columbus",
    "Portage"
  ]
  citOhio = ["Columbus",
    "Cleveland",
    "Cincinnati",
    "Toledo",
    "Akron",
    "Dayton",
    "Parma",
    "Canton",
    "Youngstown",
    "Lorain",
    "Hamilton",
    "Springfield",
    "Kettering",
    "Elyria",
    "Lakewood",
    "Cuyahoga Falls",
    "Middletown",
    "Euclid",
    "Newark",
    "Mansfield",
    "Mentor",
    "Beavercreek",
    "Cleveland Heights",
    "Strongsville",
    "Dublin",
    "Fairfield",
    "Findlay",
    "Warren",
    "Lancaster",
    "Lima",
    "Huber Heights",
    "Westerville",
    "Marion",
    "Grove City"];
  citNC = ["Charlotte",
    "Raleigh",
    "Greensboro",
    "Durham",
    "Winston-Salem",
    "Fayetteville",
    "Cary",
    "Wilmington",
    "High Point",
    "Greenville",
    "Asheville",
    "Concord",
    "Gastonia",
    "Jacksonville",
    "Chapel Hill",
    "Rocky Mount",
    "Burlington",
    "Wilson",
    "Huntersville",
    "Kannapolis",
    "Apex",
    "Hickory",
    "Goldsboro"]
  citMichi = ["Detroit",
    "Grand Rapids",
    "Warren",
    "Sterling Heights",
    "Ann Arbor",
    "Lansing",
    "Flint",
    "Dearborn",
    "Livonia",
    "Westland",
    "Troy",
    "Farmington Hills",
    "Kalamazoo",
    "Wyoming",
    "Southfield",
    "Rochester Hills",
    "Taylor",
    "Pontiac",
    "St. Clair Shores",
    "Royal Oak",
    "Novi",
    "Dearborn Heights",
    "Battle Creek",
    "Saginaw",
    "Kentwood",
    "East Lansing",
    "Roseville",
    "Portage",
    "Midland",
    "Lincoln Park",
    "Muskegon"]
  isModuleLoading = false;
  searched: any;
  showNoRecords: boolean;
  topic: any[];
  budgets: any;
  newPlat: any[];
  filterFormB: FormGroup;
  ageBrack: any[];
  plat: any[];
  platFollowers: any[];
  qty: any[];
  postForm: FormGroup;
  ratingVal = 5;
  constructor(
    /*  private shopService: ShopService, */private cdRef: ChangeDetectorRef,
    private fb: FormBuilder, public dialog: MatDialog, private router: Router,
    private snackBar: MatSnackBar, private formBuilder: FormBuilder,
    private loader: AppLoaderService, private brandService: BrandService
  ) {
    this.searched = ''; this.newPlat = []; this.ageBrack = []; this.plat = []; this.platFollowers = []; this.qty = [];
    this.topic = []; this.showNoRecords = false;
    this.filterFormB = this.formBuilder.group({
      city: [''],
      follow: [''],
      rate: ['']
    });
    this.postForm = this.formBuilder.group({
      topic: ['']
    })
    this.getInfs();
  }

  ngOnInit() {

  }
  getInfs() {
    this.brandService.viewSearchInf(this.searched, this.topic, this.newPlat, this.filterFormB.value.rate, this.filterFormB.value.city, this.ageBrack, this.platFollowers, 0, 10).subscribe(Resp => {
      console.log(Resp);
      if (Resp.response == "200") {
        this.influencers = Resp.object;
        console.log('here', this.influencers);
        this.cdRef.detectChanges();
      }
    }, error => {
      this.cdRef.detectChanges();
      console.log(error);
    })
  }

  applyFilter(e) {
    console.log(e);
    this.searched = e;

  }
  topics(eve, e, indexVal) {

    if (eve.target.checked == true) {
      if (e == 'Others') {
        console.log('others');
        // this.topic.push(this.postForm.value.topic);
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
  check() {
    console.log(this.searched, this.topic, this.newPlat, this.filterFormB.value.city, this.ageBrack);
    this.isModuleLoading = true;
    if (this.topic.indexOf(this.postForm.value.topic) > -1) {
      console.log('present');
    }
    else {
      console.log('absent');
      if (this.postForm.value.topic != '')
        this.topic.push(this.postForm.value.topic);
    }
    this.brandService.viewSearchInf(this.searched, this.topic, this.newPlat, this.filterFormB.value.rate, this.filterFormB.value.city, this.ageBrack, this.platFollowers, 0, 10).subscribe(Resp => {
      console.log('Resp', Resp);
      if (Resp.response == '200') {
        this.influencers = Resp.object;
        this.showNoRecords = false;
        this.cdRef.detectChanges();
        // this.resultsLength = Resp.object.count;
      }
      else {
        console.log('here');

        this.influencers = [];
        this.showNoRecords = true;
        this.cdRef.detectChanges();
      }
    })
  }
  addPlat(event, platform, index) {
    console.log('cgvn', event, index, platform);
    this.qty[index] = 1;
    console.log(this.qty);

    if (event.target.checked == true) {
      this.newPlat.push(platform);
      this.plat.push(index)
    }
    else {
      console.log('here topic splice')
      this.plat.splice(index, 1);
      this.newPlat.splice(index, 1);
    }
    // this.plat.push(index)
    console.log(this.newPlat)
  }
  addPlatNo(e, ind) {
    console.log('ijkm', e, 'vh', ind, 'form', this.filterFormB.value.follow);
    var indexVal = this.plat.findIndex(record => record == ind);
    if (indexVal != -1) {
      this.platFollowers[indexVal] = e.value;
    }
    else {
      console.log('no index found')
    }
    console.log(indexVal, this.plat, this.platFollowers)
  }
  city(city) {
    console.log(city.value);

  }
  fages(event, ev, indexVal) {
    console.log('fyghj', ev, 'gg', event, 'ss', indexVal);
    if (event.target.checked == true) {
      this.ageBrack.push(ev);
    }
    else {
      console.log('here');

      for (let i = 0; i < this.ageBrack.length; i++) {
        console.log('dd', this.ageBrack[i], ev);

        if (this.ageBrack[i] == ev)
          this.ageBrack.splice(indexVal, 1);
      }
    }
    console.log(this.ageBrack);
  }

  sendMsg(email) {
    const dialogApp = this.dialog.open(BrandCardComponent, {
      height: '550px',
      width: '700px',
      disableClose: true,
      data: { 'type': 'msg', 'email': email }
    });
    dialogApp.afterClosed().subscribe(result => {

    });
  }
  review(email) {
    const dialogApp = this.dialog.open(BrandCardComponent, {
      height: '467px',
      width: '700px',
      disableClose: true,
      data: { 'type': 'review', 'email': email }
    });
    dialogApp.afterClosed().subscribe(result => {

    });
  }
  pay(email) {
    this.router.navigate(['/content/influencer/payment'], { queryParams: { email: email } })
  }
}

