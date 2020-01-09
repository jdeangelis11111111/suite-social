import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  influencerSurveyForm: FormGroup;
  cities: any[];
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
  range = ['< 2k', '2k – 5k', '5k - 10k', '10k - 20k', '20k – 100k', '> 100k']
  plat: any[];
  platFollowers: any[];
  foods = ["Asian food", "American food", "European food", "Vegetarian", "Dessert", "Coffee", 'Tea', 'Others, Please specify here']
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
  data: any;
  topicPre: any = [];
  agePre: any = [];
  travelPre: any = [];
  foodPre: any = [];
  platPre: any = [];
  cityPre: any = [];
  cityPre2: any[];
  countryPre: any = [];
  count: number = 0;
  c: number;
  enable: boolean;
  checkDis = false;
  testArr: any[] = [];
  constructor(public snackBar: MatSnackBar, private router: Router, private cdRef: ChangeDetectorRef, private formBuilder: FormBuilder, private influencerService: InfluencerService, ) {
    this.email = localStorage.getItem('email');
    this.cities = [];
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
      mobile: ['', Validators.required],
      year: ['', Validators.required],
      gender: ['', Validators.required],
      topic: ['',],
      topicI: [''],
      country: ['',],
      city: ['',],
      malePer: ['',],
      femalePer: ['',],
      otherPer: ['',],
      kids: ['',],
      kidsAges: [''],
      dogs: ['',],
      cats: ['',],
      otherAnimal: ['',],
      will: ['',],
      room: ['',],
      food: ['',], foodI: [''],
      brandWork: ['',],
      brandNoWork: ['',],
      bio: ['',],
      favBrand: ['',],
      f: ['',], y: ['',], i: ['',], t: ['',], b: ['',]
    });
  }

  ngOnInit() {
    var c;
    this.getFormData();
  }
  getFormData() {
    this.influencerService.getInf(this.email).subscribe(Resp => {

      this.data = Resp.list[0];
      this.topic = this.data.topicYouPost.split(',');
      this.count = this.topic.length;
      this.agePre = this.data.yourFollowersAgeBrackets.split(',');
      this.travelPre = this.data.typeOfTravel.split(',');
      this.foodPre = this.data.typeOfFood.split(',');
      if (this.data.platformYouUse != "") {
        this.platPre = this.data.platformYouUse.split(',');
      }
      this.newPlat = this.newPlat.concat(this.platPre);
      this.foodTypes = this.foodTypes.concat(this.foodPre);
      this.travelTypes = this.travelTypes.concat(this.travelPre);
      this.ageBrack = this.ageBrack.concat(this.agePre);
      // this.influencerSurveyForm.value.city = this.data.citiesyourFollowerslocated
      // //console.log(this.agePre, this.data, this.foodPre, this.newPlat);

      if (this.data.countriesYourFollowersLocated != null) {
        if (this.data.countriesYourFollowersLocated.includes(',')) {
          this.countryPre = this.data.countriesYourFollowersLocated.split(',')
        }
        else {
          this.countryPre.push(this.data.countriesYourFollowersLocated);
        }
      }
      if (this.data.citiesYourFollowersLocated != null) {
        if (this.data.citiesYourFollowersLocated.includes(',')) {
          this.cityPre = this.data.citiesYourFollowersLocated.split(',')
        }
        else {
          this.cityPre.push(this.data.citiesYourFollowersLocated);
        }
      }
      this.influencerSurveyForm.patchValue({
        name: this.data.yourName,
        mobile: this.data.yourPhoneNumber,
        year: parseInt(this.data.yourBirthYear),
        gender: this.data.yourGender,
        topic: this.data.topicYouPost,
        country: this.countryPre,
        city: this.cityPre,
        malePer: this.data.percentageOfMaleFollowers,
        femalePer: this.data.percentageOfFemaleFollowers,
        otherPer: this.data.percentageOfOtherFollowers,
        kids: this.data.numberOfKids,
        kidsAges: this.data.theirAges,
        dogs: this.data.numberOfDogsWillingToFeature,
        cats: this.data.numberOfCatsWillingToFeature,
        otherAnimal: this.data.numberOfOtherAnimalsWillingToFeature,
        will: this.data.significantOtherWillingToFeature,
        food: this.data.typeOfFood,
        room: this.data.typeOfRoom,
        brandWork: this.data.interestedInWorkingWithBrands,
        brandNoWork: this.data.youNeverWorkWithBrands,
        bio: this.data.provideShortBioForBrands,
        favBrand: this.data.yourFavoriteBrandToWorkWithSoFor,
        y: this.data.youtubeFollowers,
        i: this.data.instagramFollowers,
        f: this.data.facebookFollowers,
        t: this.data.twitterFollowers,
        b: this.data.blogFollowers,
        // topicI: ''
      })
      // //console.log(this.topic, this.options);

      for (let j = 0; j < this.topic.length; j++) {
        if (this.topic[j] != '' && this.topic[j] != 'Beauty' && this.topic[j] != 'Food' && this.topic[j] != 'Fashion' && this.topic[j] != 'Kids' && this.topic[j] != 'Travel' && this.topic[j] != 'Sports/Fitness' && this.topic[j] != 'Health/Wellness' && this.topic[j] != 'Pets' && this.topic[j] != 'Travel (Including Hotel)' && this.topic[j] != 'Families' && this.topic[j] != 'Cars' && this.topic[j] != 'CPG' && this.topic[j] != 'Leisure' && this.topic[j] != 'Others') {
          // //console.log('here', this.topic[j]);
          // this.topic.push('Others')
          // //console.log(this.topic);
          this.count--;
          this.influencerSurveyForm.patchValue({
            topicI: this.topic[j],
            topic: this.topic
          });

          break;
        }
        else {
          this.influencerSurveyForm.patchValue({
            topicI: ''
          })
        }

      }
      for (let j = 0; j < this.foodTypes.length; j++) {
        if (this.foodTypes[j] != 'Asian food' && this.foodTypes[j] != 'American food' && this.foodTypes[j] != 'European food' && this.foodTypes[j] != 'Vegetarian' && this.foodTypes[j] != 'dessert' && this.foodTypes[j] != 'Coffee' && this.foodTypes[j] != 'Tea' && this.foodTypes[j] != 'Others, Please specify here') {
          // this.foodTypes[j] = this.influencerSurveyForm.value.foodI;
          // //console.log(this.foodTypes);
          this.influencerSurveyForm.patchValue({
            foodI: this.foodTypes[j],
            food: this.foodTypes
          });

          break;
        }
        else {
          this.influencerSurveyForm.patchValue({
            foodI: ''
          })
        }

      }
      // //console.log("form after patchvalue", this.influencerSurveyForm.value)

    })

  }
  yValue(type) {
    var val = true;
    if (type == "y") {
      for (let i = 0; i < this.newPlat.length; i++) {
        if (this.newPlat[i] == 'Youtube') {
          val = false;
          break;
        }
      }
    }
    else if (type == "i") {
      for (let i = 0; i < this.newPlat.length; i++) {
        if (this.newPlat[i] == 'Instagram') {
          val = false;
          break;
        }
      }
    }
    else if (type == "f") {
      for (let i = 0; i < this.newPlat.length; i++) {
        if (this.newPlat[i] == 'Facebook') {
          val = false;
          break;
        }
      }
    }
    else if (type == "t") {
      for (let i = 0; i < this.newPlat.length; i++) {
        if (this.newPlat[i] == 'Twitter') {
          val = false;
          break;
        }
      }
    }
    else {
      for (let i = 0; i < this.newPlat.length; i++) {
        if (this.newPlat[i] == 'Blog') {
          val = false;
          break;
        }
      }
    }
    return val;
  }
  updateSurvey() {
    this.testArr = []
    var userId = localStorage.getItem('user');
    var survey = localStorage.getItem('survey');
    if (this.influencerSurveyForm.value.y != "")
      this.testArr.push(this.influencerSurveyForm.value.y)
    if (this.influencerSurveyForm.value.i != "")
      this.testArr.push(this.influencerSurveyForm.value.i)
    if (this.influencerSurveyForm.value.f != "")
      this.testArr.push(this.influencerSurveyForm.value.f)
    if (this.influencerSurveyForm.value.t != "")
      this.testArr.push(this.influencerSurveyForm.value.t)
    if (this.influencerSurveyForm.value.b != "")
      this.testArr.push(this.influencerSurveyForm.value.b)
    if (survey == 'true') {
      for (let i = 0; i < this.foodTypes.length; i++) {
        if (this.foodTypes[i] == 'Others, Please specify here') {
          var index = this.foodTypes.indexOf('Others, Please specify here');
          //console.log('index', index)
          if (index !== -1 && this.influencerSurveyForm.value.foodI != "") {
            this.foodTypes[index] = this.influencerSurveyForm.value.foodI;
          }
          else {
            this.foodTypes.splice(index, 1);
          }
        }


      }
      for (let j = 0; j < this.foodTypes.length; j++) {
        if (this.foodTypes[j] != 'Asian food' && this.foodTypes[j] != 'American food' && this.foodTypes[j] != 'European food' && this.foodTypes[j] != 'Vegetarian' && this.foodTypes[j] != 'dessert' && this.foodTypes[j] != 'Coffee' && this.foodTypes[j] != 'Tea' && this.foodTypes[j] != 'Others, Please specify here') {
          this.foodTypes[j] = this.influencerSurveyForm.value.foodI;
        }
      }
      for (let i = 0; i < this.topic.length; i++) {
        if (this.topic[i] == 'Others') {
          var index = this.topic.indexOf('Others');
          //console.log('index', index)
          if (index !== -1) {
            this.topic[index] = this.influencerSurveyForm.value.topicI;
          }
        }
      }
      for (let j = 0; j < this.topic.length; j++) {
        if (this.topic[j] != 'Beauty' && this.topic[j] != 'Food' && this.topic[j] != 'Fashion' && this.topic[j] != 'Kids' && this.topic[j] != 'Travel' && this.topic[j] != 'Sports/Fitness' && this.topic[j] != 'Health/Wellness' && this.topic[j] != 'Pets' && this.topic[j] != 'Travel (Including Hotel)' && this.topic[j] != 'Families' && this.topic[j] != 'Cars' && this.topic[j] != 'CPG' && this.topic[j] != 'Leisure' && this.topic[j] != 'Others') {
          this.topic[j] = this.influencerSurveyForm.value.topicI;
        }
      }
      if (!this.influencerSurveyForm.invalid && this.influencerSurveyForm.value.name.trim() != '' && this.influencerSurveyForm.value.mobile.trim() != '' && this.influencerSurveyForm.value.gender != '' && this.influencerSurveyForm.value.year != '') {
        // console.log(this.count, this.topic)
        if (this.topic.length < 4) {
          // //console.log(this.newPlat.length, this.testArr.length);

          if (this.newPlat.length == this.testArr.length) {
            // if (this.checkDis != true) {
            this.influencerService.updateINFForm(this.influencerSurveyForm.value, this.email, userId, this.topic, this.ageBrack, this.travelTypes, this.foodTypes, this.newPlat, this.platFollowers).subscribe(Resp => {
              if (Resp.response == 200) {
                //console.log('Resp', Resp);
                // alert('Sucessfully Saved');
                localStorage.setItem('survey', 'true')
                this.openSnackBar('Sucessfully Saved');
                this.some = true;
                this.router.navigate(['content/influencer']);
              }
              else {

                this.openSnackBar('Please fill all the fields with *');
              }
            }, error => {
              this.openSnackBar('Please fill all the fields with *');
            })
          }
          else {
            this.openSnackBar('Please choose the number of followers you have on platform');
            this.checkDis = false;
          }
        }
        else {
          //console.log(this.count)
          this.openSnackBar('Please choose upto 3 topics only');
          this.getFormData();
        }
      }
      else
        this.openSnackBar('Please fill all the fields with *');
    }
    else {
      this.addProfile(userId);
    }
  }
  addProfile(id) {
    for (let i = 0; i < this.foodTypes.length; i++) {
      if (this.foodTypes[i] == 'Others, Please specify here') {
        var index = this.foodTypes.indexOf('Others, Please specify here');
        //console.log('index', index)
        if (index !== -1 && this.influencerSurveyForm.value.foodI != "") {
          this.foodTypes[index] = this.influencerSurveyForm.value.foodI;
        }
        else {
          this.foodTypes.splice(index, 1);
        }
      }


    }
    for (let j = 0; j < this.foodTypes.length; j++) {
      if (this.foodTypes[j] != 'Asian food' && this.foodTypes[j] != 'American food' && this.foodTypes[j] != 'European food' && this.foodTypes[j] != 'Vegetarian' && this.foodTypes[j] != 'dessert' && this.foodTypes[j] != 'Coffee' && this.foodTypes[j] != 'Tea' && this.foodTypes[j] != 'Others, Please specify here') {
        this.foodTypes[j] = this.influencerSurveyForm.value.foodI;
      }
    }
    for (let i = 0; i < this.topic.length; i++) {
      if (this.topic[i] == 'Others') {
        var index = this.topic.indexOf('Others');
        //console.log('index', index)
        if (index !== -1) {
          this.topic[index] = this.influencerSurveyForm.value.topicI;
        }
      }
    }
    for (let j = 0; j < this.topic.length; j++) {
      if (this.topic[j] != 'Beauty' && this.topic[j] != 'Food' && this.topic[j] != 'Fashion' && this.topic[j] != 'Kids' && this.topic[j] != 'Travel' && this.topic[j] != 'Sports/Fitness' && this.topic[j] != 'Health/Wellness' && this.topic[j] != 'Pets' && this.topic[j] != 'Travel (Including Hotel)' && this.topic[j] != 'Families' && this.topic[j] != 'Cars' && this.topic[j] != 'CPG' && this.topic[j] != 'Leisure' && this.topic[j] != 'Others') {
        this.topic[j] = this.influencerSurveyForm.value.topicI;
      }
    }

    //console.log(this.topic);

    if (!this.influencerSurveyForm.invalid && this.influencerSurveyForm.value.name.trim() != '' && this.influencerSurveyForm.value.mobile.trim() != '' && this.influencerSurveyForm.value.gender != '' && this.influencerSurveyForm.value.year != '') {
      if (this.topic.length < 4) {
        //console.log(this.checkDis);

        if (this.newPlat.length == this.testArr.length) {
          // if (this.checkDis != true) {
          this.influencerService.updateINFFormAdd(this.influencerSurveyForm.value, this.email, id, this.topic, this.ageBrack, this.travelTypes, this.foodTypes, this.newPlat, this.platFollowers).subscribe(Resp => {
            if (Resp.response == 200) {
              //console.log('Resp', Resp);
              // alert('Sucessfully Saved');
              localStorage.setItem('survey', 'true')
              this.openSnackBar('Sucessfully Saved');
              this.some = true;
              this.router.navigate(['content/influencer']);
            }
            else {

              this.openSnackBar('Please fill all the fields with *');
            }
          }, error => {
            this.openSnackBar('Please fill all the fields with *');
          })
        }
        else {
          this.openSnackBar('Please choose the number of followers you have on platform')
        }
      }
      else {
        //console.log(this.count)
        this.openSnackBar('Please choose upto 3 topics only');
        this.getFormData();
      }
    }
    else
      this.openSnackBar('Please fill all the fields with *');
  }
  addPlat(event, index, platform) {
    //console.log('cgvn', event, index, platform)
    this.qty[index] = 1;
    /*   for (let i = 0; i < this.plat.length; i++) {
        if (this.plat[i] != index)
          this.plat.push(index);
      } */
    if (event.target.checked == true) {
      this.newPlat.push(platform)
      this.plat.push(index);
    }
    else {
      for (let i = 0; i < this.newPlat.length; i++) {
        if (this.newPlat[i] == platform)
          this.newPlat.splice(i, 1);
        this.plat.splice(index, 1);
        if (platform == 'Youtube') {
          this.influencerSurveyForm.patchValue({
            y: ""
          })
        }
        else if (platform == 'Instagram') {
          this.influencerSurveyForm.patchValue({
            i: ""
          })
        }
        else if (platform == 'Twitter') {
          this.influencerSurveyForm.patchValue({
            t: ""
          })

        }
        else if (platform == 'Facebook') {
          this.influencerSurveyForm.patchValue({
            f: ""
          })
        }
        else if (platform == 'Blog') {
          this.influencerSurveyForm.patchValue({
            b: ""
          })
        }
      }

    }
    // this.plat.push(index)
    //console.log(this.plat, this.newPlat)
  }
  addPlatNo(e, ind) {
    //console.log('ijkm', e.target.value, 'vh', ind);
    var indexVal = this.plat.findIndex(record => record == ind);
    if (indexVal != -1) {
      this.platFollowers[indexVal] = e.target.value;
    }
    else {
      //console.log('no index found')
    }
    //console.log(indexVal, this.plat, this.platFollowers)
  }

  topics(eve, e, indexVal) {
    //console.log(e, indexVal, this.topic.length)
    if (eve.target.checked == true)
      this.topic.push(e);
    else {
      for (let i = 0; i < this.topic.length; i++) {
        if (this.topic[i] == e)
          this.topic.splice(i, 1);
        if (e == 'Others') {
          for (let j = 0; j < this.topic.length; j++) {
            if (this.topic[j] != 'Beauty' && this.topic[j] != 'Food' && this.topic[j] != 'Fashion' && this.topic[j] != 'Kids' && this.topic[j] != 'Travel' && this.topic[j] != 'Sports/Fitness' && this.topic[j] != 'Health/Wellness' && this.topic[j] != 'Pets' && this.topic[j] != 'Travel (Including Hotel)' && this.topic[j] != 'Families' && this.topic[j] != 'Cars' && this.topic[j] != 'CPG' && this.topic[j] != 'Leisure' && this.topic[j] != 'Others') {
              this.topic.splice(j, 1);
              this.influencerSurveyForm.patchValue({
                topicI: ''
              })
            }
          }
        }

      }
    }
    this.c = this.topic.length;
    /* for (let i = 0; i < this.topic.length; i++) {
      if (this.topic[i] == 'Others')
        this.c--;
    } */
    if (this.topic.length > 3)
      this.openSnackBar('Please choose upto 3 topics only');
    //console.log(this.topic);

  }
  fages(event, ev, indexVal) {
    //console.log('fyghj', ev, 'gg', event, 'ss', indexVal);
    if (event.target.checked == true) {
      this.ageBrack.push(ev);
    }
    else {
      // this.ageBrack.splice(indexVal, 1);
      for (let i = 0; i < this.ageBrack.length; i++) {
        //console.log(ev, this.ageBrack[i]);

        if (ev == this.ageBrack[i]) {
          this.ageBrack.splice(i, 1);
          //console.log('splice', i, this.ageBrack)
        }
      }
    }
    //console.log(this.ageBrack);
  }
  travelType(event, ev, indexVal) {
    //console.log('fyghj', ev, 'gg', event, 'ss', indexVal);
    if (event.target.checked == true) {
      this.travelTypes.push(ev);
    }
    else {
      // this.travelTypes.splice(indexVal, 1);
      for (let i = 0; i < this.travelTypes.length; i++) {
        //console.log(ev, this.travelTypes[i]);

        if (ev == this.travelTypes[i]) {
          this.travelTypes.splice(i, 1);
          //console.log('splice', i, this.travelTypes)
        }
      }
    }
    //console.log(this.travelTypes);
  }
  foodType(event, ev, indexVal) {
    //console.log('fyghj', ev, 'gg', event, 'ss', indexVal);
    if (event.target.checked == true) {
      this.foodTypes.push(ev);
    }
    else {
      for (let i = 0; i < this.foodTypes.length; i++) {
        //console.log(ev, this.foodTypes[i]);

        if (ev == this.foodTypes[i]) {
          this.foodTypes.splice(i, 1);
          //console.log('splice', i, this.foodTypes)
        }
        if (ev == 'Others, Please specify here') {
          for (let j = 0; j < this.foodTypes.length; j++) {
            if (this.foodTypes[j] != 'Asian food' && this.foodTypes[j] != 'American food' && this.foodTypes[j] != 'European food' && this.foodTypes[j] != 'Vegetarian' && this.foodTypes[j] != 'dessert' && this.foodTypes[j] != 'Coffee' && this.foodTypes[j] != 'Tea' && this.foodTypes[j] != 'Others, Please specify here') {
              this.foodTypes.splice(j, 1);
              this.influencerSurveyForm.patchValue({
                foodI: ''
              })
            }
          }
        }
      }
    }
    //console.log(this.foodTypes);
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
  inputChecked(opt, qType, index) {
    let checked = false;
    if (qType == 'topics') {
      for (let j = 0; j < this.topic.length; j++) {
        if (opt == this.topic[j]) {
          checked = true;
          // break;
        }
        if (opt == 'Others' && this.topic[j] != '' && this.topic[j] != 'Beauty' && this.topic[j] != 'Food' && this.topic[j] != 'Fashion' && this.topic[j] != 'Kids' && this.topic[j] != 'Travel' && this.topic[j] != 'Sports/Fitness' && this.topic[j] != 'Health/Wellness' && this.topic[j] != 'Pets' && this.topic[j] != 'Travel (Including Hotel)' && this.topic[j] != 'Families' && this.topic[j] != 'Cars' && this.topic[j] != 'CPG' && this.topic[j] != 'Leisure' && this.topic[j] != 'Others') {
          //console.log('other and new');

          checked = true;
        }
      }
    }
    else if (qType == 'age') {
      for (let j = 0; j < this.agePre.length; j++) {
        if (opt == this.agePre[j]) {
          checked = true;
          break;
        }
      }
    }
    else if (qType == 'travel') {
      for (let j = 0; j < this.travelPre.length; j++) {
        if (opt == this.travelPre[j]) {
          checked = true;
          break;
        }
      }
    }
    else if (qType == 'food') {
      for (let j = 0; j < this.foodTypes.length; j++) {
        if (opt == this.foodTypes[j]) {
          checked = true;
          break;
        }
        if (opt == 'Others, Please specify here' && this.foodTypes[j] != 'Asian food' && this.foodTypes[j] != 'American food' && this.foodTypes[j] != 'European food' && this.foodTypes[j] != 'Vegetarian' && this.foodTypes[j] != 'dessert' && this.foodTypes[j] != 'Coffee' && this.foodTypes[j] != 'Tea' && this.foodTypes[j] != 'Others, Please specify here') {
          checked = true;
          //console.log(opt, this.foodTypes[j]);

        }

      }
    }
    else if (qType == 'plat') {
      for (let j = 0; j < this.platPre.length; j++) {
        if (opt == this.platPre[j]) {
          this.qty[index] = 1;
          checked = true;
          break;
        }
      }
    }
    return checked;
  }
  getSelected(follow, i) {
    //console.log(follow, i, this.data.youtubeFollowers)
    let selected = false;
    if (i == 0) {
      if (this.data.youtubeFollowers != '') {
        if (follow == this.data.youtubeFollowers)
          selected = true;
      }
    }
    else if (i == 1) {
      if (this.data.instagramFollowers != '') {
        selected = true;
      }
    }
    else if (i == 2) {
      if (this.data.facebookFollowers != '') {
        selected = true;
      }
    }
    else if (i == 3) {
      if (this.data.twitterFollowers != '') {
        selected = true;
      }
    }
    else if (i == 4) {
      if (this.data.blogFollowers != '') {
        selected = true;
      }
    }

    return selected;
  }
  compareMod(m1, m2): boolean {
    //console.log("m1", m1, "m2", m2);
    return m1 == m2;
  }
  compareMod1(m1, m2): boolean {
    //console.log("im1", m1, "m2", m2);
    return m1 == m2;
  }
  compareMod2(m1, m2): boolean {
    //console.log("fm1", m1, "m2", m2);
    return m1 == m2;
  }
  compareMod3(m1, m2): boolean {
    //console.log("tm1", m1, "m2", m2);
    return m1 == m2;
  }
  compareMod4(m1, m2): boolean {
    //console.log("bm1", m1, "m2", m2);
    return m1 == m2;
  }
  openSnackBar(message) {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
export interface Module {
  value: any;
  viewValue: any
}