import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InfluencerService } from 'app/services/influencer.service';
// import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'app/services/login.service';
import { MatDialog } from '@angular/material';
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
  selector: 'app-inf-card',
  templateUrl: './inf-card.component.html',
  styleUrls: ['./inf-card.component.scss']
})
export class InfCardComponent implements OnInit {
  influencerSurveyForm: FormGroup;
  qty: any[];
  ages: categ[] = [
    { value: '< 20', viewValue: 'below 20' },
    { value: '20 - 30', viewValue: '20 - 30' },
    { value: '30 - 40', viewValue: '30 - 40' },
    { value: '> 40', viewValue: 'above 40' }
  ];
  opts = ['Beauty', 'Food', 'Fashion', 'Kids', 'Travel', 'Sports/Fitness', 'Health/Wellness', 'Pets', 'Travel (Including Hotel)', 'Families', 'Others']
  // ages = ['below 20', '20-30', '30-40', '40 and above'];
  platforms = ['Youtube', 'Instagram', 'Facebook', 'Twitter', 'Blog'];
  coms = ['Phone Call', 'Email'];
  gender = ['Male', 'Female', 'Not Specified'];
  options = ['Beauty', 'Food', 'Fashion', 'Kids', 'Travel', 'Sports/Fitness', 'Health/Wellness', 'Pets', 'Travel (Including Hotel)', 'Families', 'Cars', 'CPG', 'Leisure', 'Others']
  countries = ['US'];
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
  wills = ['Yes', 'No'];
  typeTravel = ['Family', 'Romance', 'Adventure', 'Solo', 'Experiential'];
  rooms = ['Double', 'Queen', 'King'];
  years: any[];
  // years = [ '1996', '1997', '1998', '1999'];
  range = ['Select', '< 2k', '2k – 5k', '5k - 10k', '10k - 20k', '20k – 100k', '> 100k']
  plat: any[];
  platFollowers: any[];
  foods = ["Asian food", "American food", "European food", "Vegetarian ", "Dessert", "Coffee", 'Tea', 'Others, Please specify here']
  topic: any[];
  ageBrack: any[];
  travelTypes: any[];
  foodTypes: any[];
  newPlat: any[];
  some: any;
  formPer: boolean;
  year: number;
  see: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  upto3 = false;
  messageForm: FormGroup;
  email: any;
  dis = false;
  rating: any = 0;
  reviewForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<InfCardComponent>, public snackBar: MatSnackBar, private formBuilder: FormBuilder, private influencerService: InfluencerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data);

    this.qty = []; this.newPlat = []; this.years = []
    this.plat = []; this.platFollowers = [], this.topic = [];
    this.ageBrack = []; this.travelTypes = []; this.foodTypes = [];
    this.year = 2019; this.see = 1960;
    var yearList = this.year - 1960;
    for (var i = 0; i <= yearList; i++) {
      this.years.push(this.see + i);

    }

    this.years.reverse();
    // this.years.unshift('Select');
    const Regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    this.influencerSurveyForm = this.formBuilder.group({
      name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.pattern(Regex)]],
      mobile: ['', Validators.required],
      year: ['', Validators.required],
      // platform: ['',Validators.required''],
      gender: ['', Validators.required],
      topic: ['',/* Validators.required */],
      country: ['',/*  Validators.required */],
      city: ['',/*  Validators.required */],
      // followerAge: ['',Validators.required],
      malePer: ['', /* Validators.required */],
      femalePer: ['', /* Validators.required */],
      otherPer: ['', /* Validators.required */],
      kids: ['', /* Validators.required */],
      kidsAges: [''],
      dogs: ['', /* Validators.required */],
      cats: ['', /* Validators.required */],
      otherAnimal: ['', /* Validators.required */],
      will: ['', /* Validators.required */],
      // travel: ['',/* Validators.required */],
      room: ['', /* Validators.required */],
      food: ['', /* Validators.required */],
      brandWork: ['', /* Validators.required */],
      brandNoWork: ['', /* Validators.required */],
      bio: ['', /* Validators.required */],
      favBrand: ['', /* Validators.required */],
    });
    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
    this.reviewForm = this.formBuilder.group({
      review: ['',],
      rate: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.email = localStorage.getItem('email');
    console.log(this.email);

  }
  onClick(v) {
    console.log('here', v)
    this.rating = v;
  }
  rate() {
    this.influencerService.rateBrand(this.email, this.rating, this.data.email, this.reviewForm.value.review).subscribe(Resp => {
      if (Resp.response == 200) {
        this.openSnackBar('Brand rating successful')
        this.dialogRef.close();
      }
      else {
        this.openSnackBar1('Brand rating failed');
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  get b() {
    return this.influencerSurveyForm.controls;
  }
  submitSurvey() {
    for (let i = 0; i < this.foodTypes.length; i++) {
      if (this.foodTypes[i] == 'Others, Please specify here') {
        var index = this.foodTypes.indexOf('Others, Please specify here');
        console.log('index', index)
        if (index !== -1) {
          this.foodTypes[index] = this.influencerSurveyForm.value.food;
        }
      }


    }
    for (let i = 0; i < this.topic.length; i++) {
      if (this.topic[i] == 'Others') {
        var index = this.topic.indexOf('Others');
        console.log('index', index)
        if (index !== -1) {
          this.topic[index] = this.influencerSurveyForm.value.topic;
        }
      }
    }
    var userId = localStorage.getItem('user');
    console.log(this.newPlat.length, this.platFollowers.length);

    if (!this.influencerSurveyForm.invalid && this.influencerSurveyForm.value.name.trim() != '' && this.influencerSurveyForm.value.mobile.trim() != '' && this.influencerSurveyForm.value.gender != '' && this.influencerSurveyForm.value.year != '') {
      if (this.topic.length <= 3) {
        if (this.newPlat.length == this.platFollowers.length) {
          this.influencerService.submitINFForm(this.influencerSurveyForm.value, this.email, userId, this.topic, this.ageBrack, this.travelTypes, this.foodTypes, this.newPlat, this.platFollowers).subscribe(Resp => {
            if (Resp.response == 200) {
              console.log('Resp', Resp);
              // alert('Sucessfully Saved');
              localStorage.setItem('survey', 'true')
              this.openSnackBar('Sucessfully Saved');

              this.onNoClick();
              // this.toastr.success('Survey Completed Successfully');
              this.some = true;
            }
            else {

              this.openSnackBar('Please fill all the fields with *');
              // this.toastr.success('Please fill all the fields with *');
            }
          }, error => {
            this.openSnackBar('Please fill all the fields with *');
            // this.toastr.success('Please fill all the fields with *');
          })
        }
        else {
          this.openSnackBar('Please choose the number of followers you have on platform')
        }
      }
      else {
        this.openSnackBar('Please choose upto 3 topics only')
      }
    }
    else
      this.openSnackBar('Please fill all the fields with *');
  }
  addPlat(event, index, platform) {
    console.log('cgvn', event, index, platform)
    this.qty[index] = 1;
    /*   for (let i = 0; i < this.plat.length; i++) {
        if (this.plat[i] != index)
          this.plat.push(index);
      } */
    if (event.target.checked == true) {
      this.newPlat.push(platform)
      this.plat.push(index)
    }
    else {
      for (let i = 0; i < this.newPlat.length; i++) {
        if (this.newPlat[i] == platform)
          this.newPlat.splice(i, 1);
        this.plat.splice(i, 1);
      }
      // this.plat.splice(index, 1);
      // this.newPlat.splice(index, 1);
    }
    // this.plat.push(index)
    console.log(this.plat, this.newPlat)
  }
  addPlatNo(e, ind) {
    console.log('ijkm', e.target.value, 'vh', ind);
    var indexVal = this.plat.findIndex(record => record == ind);
    if (indexVal != -1) {
      this.platFollowers[indexVal] = e.target.value;
    }
    else {
      console.log('no index found')
    }
    /*     for (let i = 0; i < this.plat.length; i++) {
          console.log(this.plat[i])
          if (this.plat[i] == ind) {
            this.platFollowers.push(e.target.value);
          }
    
        } */
    // this.platFollowers.push(e.target.value);
    console.log(indexVal, this.plat, this.platFollowers)
  }
  topics(eve, e, indexVal) {

    if (eve.target.checked == true)
      this.topic.push(e);
    else {
      for (let i = 0; i < this.topic.length; i++) {
        if (this.topic[i] == e)
          this.topic.splice(i, 1);
      }
    }
    if (this.topic.length > 3)
      this.openSnackBar('Please choose upto 3 topics only');
  }
  fages(event, ev, indexVal) {
    console.log('fyghj', ev, 'gg', event, 'ss', indexVal);
    if (event.target.checked == true) {
      this.ageBrack.push(ev);
    }
    else {
      this.ageBrack.splice(indexVal, 1);
    }
    console.log(this.ageBrack);
  }
  travelType(event, ev, indexVal) {
    console.log('fyghj', ev, 'gg', event, 'ss', indexVal);
    if (event.target.checked == true) {
      this.travelTypes.push(ev);
    }
    else {
      this.travelTypes.splice(indexVal, 1);
    }
    console.log(this.travelTypes);
  }
  foodType(event, ev, indexVal) {
    console.log('fyghj', ev, 'gg', event, 'ss', indexVal);
    if (event.target.checked == true) {
      this.foodTypes.push(ev);
    }
    else {
      this.foodTypes.splice(indexVal, 1);
    }
    console.log(this.foodTypes);
  }
  _keyPressDec(event: any) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }
  _keyPressDec2(event: any) {
    const pattern = /^[0-9]*\.?\d{0,2}$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
    if (event.target.value < 0 || event.target.value > 100)
      this.formPer = true;
    else
      this.formPer = false;
  }
  openSnackBar(message) {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  sendMsg() {
    this.dis = true;
    console.log(this.messageForm.value);
    this.influencerService.sendMsg(this.messageForm.value, this.email, this.data.email).subscribe(Respon => {
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
  openSnackBar1(message) {
    this.snackBar.open(message, 'Please Try Again', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
