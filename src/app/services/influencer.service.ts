import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Links } from 'app/links.module';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
@Injectable({
    providedIn: 'root'
})
export class InfluencerService {
    dollar: any[] = [];
    stat: number;
    /*   private user = new BehaviorSubject<any>(null);
      currentUser = this.user.asObservable();
    
      private messageSource = new Subject<any>();
      // currentLogin = this.messageSource.asObservable();
      private subject = new Subject<any>();
    
      encryptSecretKey = '91e@0#5a942@@9ef'; */

    constructor(private http: HttpClient) { }


    submitINFForm(form, email, id, topic, age, travelType, food, plat, platF) {
        console.log(topic);
        this.dollar = []
        const token = localStorage.getItem('jwtToken');
        const formData = new FormData();
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        console.log(platF);
        var platforms = ['Youtube', 'Instagram', 'Facebook', 'Twitter', 'Blog'];
        var blog = "", youtubeFollowers = "", insta = "", fb = "", tweet = "";
        for (let i = 0; i < plat.length; i++) {

            if (plat[i] == 'Youtube') {
                youtubeFollowers = platF[i];
            }
            else if (plat[i] == 'Instagram') {
                insta = platF[i];
            }
            else if (plat[i] == 'Facebook') {
                fb = platF[i];
            }
            else if (plat[i] == 'Twitter') {
                tweet = platF[i];
            }
            else if (plat[i] == 'Blog') {
                blog = platF[i];
            }
            else
                console.log('No')

        }
        if (form.copy == true) {
            var copy = 'Yes'
        }
        var a = [youtubeFollowers, insta, fb, tweet, blog];
        console.log(a);
        for (let i = 0; i < a.length; i++) {
            if (a[i] == '< 2k') {
                this.dollar.push('$0 - $50');
            }
            else if (a[i] == '2k – 5k') {
                this.dollar.push('$50 - $75');
            }
            else if (a[i] == '5k - 10k') {
                this.dollar.push('$75 - $125');
            }
            else if (a[i] == '10k - 20k') {
                this.dollar.push('$125 - $225');
            }
            else if (a[i] == '20k – 100k') {
                this.dollar.push('$225 - $500');
            }
            else if (a[i] == '> 100k') {
                this.dollar.push('> $500');
            }
            else {
                this.dollar.push('');
            }
        }

        console.log('Survey form', form, this.dollar);
        const data = {
            "yourName": form.name,
            "yourEmail": email,
            "yourPhoneNumber": form.mobile,
            "yourBirthYear": form.year,
            "yourGender": form.gender,
            "platformYouUse": plat.toString(),//form.platform
            "topicYouPost": topic.toString(),
            "countriesYourFollowersLocated": form.country.toString(),
            "citiesYourFollowersLocated": form.city.toString(),
            "yourFollowersAgeBrackets": age.toString(),
            "percentageOfMaleFollowers": form.malePer,
            "percentageOfFemaleFollowers": form.femalePer,
            "percentageOfOtherFollowers": form.otherPer,
            "numberOfKids": form.kids,
            "theirAges": form.kidsAges,
            "numberOfDogsWillingToFeature": form.dogs,
            "numberOfCatsWillingToFeature": form.cats,
            "numberOfOtherAnimalsWillingToFeature": form.otherAnimal,
            "significantOtherWillingToFeature": form.will,
            "typeOfTravel": travelType.toString(), //form.travel
            "typeOfRoom": form.room,
            "typeOfFood": food.toString(),//form.food
            "interestedInWorkingWithBrands": form.brandWork,
            "youNeverWorkWithBrands": form.brandNoWork,
            "provideShortBioForBrands": form.bio,
            "yourFavoriteBrandToWorkWithSoFor": form.favBrand,
            "facebookPriceRange": this.dollar[2],
            "instagramPriceRange": this.dollar[1],
            "twitterPriceRange": this.dollar[3],
            "youtubePriceRange": this.dollar[0],
            "blogPriceRange": this.dollar[4],
            "facebookFollowers": fb,
            "instagramFollowers": insta,
            "twitterFollowers": tweet,
            "youtubeFollowers": youtubeFollowers,
            "blogFollowers": blog,
            "infl": {
                "influencerId": parseInt(id)
            }


        };

        console.log(data);

        return this.http.post(Links.SUBMITINFFORM, data).map((response: any) => response);
    }
    getAllBrands() {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        return this.http.get(Links.GETALLBRAND).map((response: any) => response);
    }
    viewSearchBrands(search, categ, rate, budget, index, pageSize) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        if (categ.length == 0)
            var prod = []
        else
            prod = categ
        if (budget == 0)
            var overallbud = null
        else
            var overallbud = budget
        if (search == '')
            var search = null
        else
            search = search
        if (rate == 0)
            var rate = null
        else
            rate = rate
        const body = {
            yourcompanyName: search,
            productCategory: prod,
            overallBudget: overallbud,
            averageRating: rate
        }
        return this.http.post(Links.GETSEARCHBRAND, body).map((response: any) => response);
    }
    sendMsg(form, fromId, toId) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            messageTitle: form.title,
            messageBody: form.body,
            from: fromId,
            to: toId,
            senderType: 2,
            // toType: 1,
            // outbound:1
        }
        console.log(body);

        return this.http.post(Links.SENDMSG, body).map((response: any) => response);
    }
    getInf(email) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            "yourEmail": email
        }
        console.log(body);

        return this.http.post(Links.GETINFFORM, body).map((response: any) => response);
    }
    updateINFForm(form, email, id, topic, age, travelType, food, plat, platF) {
        this.dollar = []
        const token = localStorage.getItem('jwtToken');
        const formData = new FormData();
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        console.log(platF);
        var platforms = ['Youtube', 'Instagram', 'Facebook', 'Twitter', 'Blog'];
        var blog = "", youtubeFollowers = "", insta = "", fb = "", tweet = "";
        for (let i = 0; i < plat.length; i++) {

            if (plat[i] == 'Youtube') {
                youtubeFollowers = platF[i];
            }
            else if (plat[i] == 'Instagram') {
                insta = platF[i];
            }
            else if (plat[i] == 'Facebook') {
                fb = platF[i];
            }
            else if (plat[i] == 'Twitter') {
                tweet = platF[i];
            }
            else if (plat[i] == 'Blog') {
                blog = platF[i];
            }
            else
                console.log('No')

        }
        if (form.copy == true) {
            var copy = 'Yes'
        }
        var a = [form.y, form.i, form.f, form.t, form.b];
        console.log('a', a);

        for (let i = 0; i < a.length; i++) {
            if (a[i] == '< 2k') {
                this.dollar.push('$0 - $50');
            }
            else if (a[i] == '2k – 5k') {
                this.dollar.push('$50 - $75');
            }
            else if (a[i] == '5k - 10k') {
                this.dollar.push('$75 - $125');
            }
            else if (a[i] == '10k - 20k') {
                this.dollar.push('$125 - $225');
            }
            else if (a[i] == '20k – 100k') {
                this.dollar.push('$225 - $500');
            }
            else if (a[i] == '> 100k') {
                this.dollar.push('> $500');
            }
            else {
                this.dollar.push('');
            }
        }

        console.log('Survey form', form, this.dollar);
        const data = {
            "yourName": form.name,
            "yourEmail": email,
            "yourPhoneNumber": form.mobile,
            "yourBirthYear": form.year,
            "yourGender": form.gender,
            "platformYouUse": plat.toString(),//form.platform
            "topicYouPost": topic.toString(),
            "countriesYourFollowersLocated": form.country.toString(),
            "citiesYourFollowersLocated": form.city.toString(),
            "yourFollowersAgeBrackets": age.toString(),
            "percentageOfMaleFollowers": form.malePer,
            "percentageOfFemaleFollowers": form.femalePer,
            "percentageOfOtherFollowers": form.otherPer,
            "numberOfKids": form.kids,
            "theirAges": form.kidsAges,
            "numberOfDogsWillingToFeature": form.dogs,
            "numberOfCatsWillingToFeature": form.cats,
            "numberOfOtherAnimalsWillingToFeature": form.otherAnimal,
            "significantOtherWillingToFeature": form.will,
            "typeOfTravel": travelType.toString(), //form.travel
            "typeOfRoom": form.room,
            "typeOfFood": food.toString(),//form.food
            "interestedInWorkingWithBrands": form.brandWork,
            "youNeverWorkWithBrands": form.brandNoWork,
            "provideShortBioForBrands": form.bio,
            "yourFavoriteBrandToWorkWithSoFor": form.favBrand,
            "facebookPriceRange": this.dollar[2],
            "instagramPriceRange": this.dollar[1],
            "twitterPriceRange": this.dollar[3],
            "youtubePriceRange": this.dollar[0],
            "blogPriceRange": this.dollar[4],
            "facebookFollowers": form.f,
            "instagramFollowers": form.i,
            "twitterFollowers": form.t,
            "youtubeFollowers": form.y,
            "blogFollowers": form.b,
            "infl": {
                "influencerId": parseInt(id)
            }


        };

        console.log(data);

        return this.http.post(Links.UPDATEINFFORM, data).map((response: any) => response);
    }
    updateINFFormAdd(form, email, id, topic, age, travelType, food, plat, platF) {
        this.dollar = []
        const token = localStorage.getItem('jwtToken');
        const formData = new FormData();
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        console.log(platF);
        var platforms = ['Youtube', 'Instagram', 'Facebook', 'Twitter', 'Blog'];
        var blog = "", youtubeFollowers = "", insta = "", fb = "", tweet = "";
        for (let i = 0; i < plat.length; i++) {

            if (plat[i] == 'Youtube') {
                youtubeFollowers = platF[i];
            }
            else if (plat[i] == 'Instagram') {
                insta = platF[i];
            }
            else if (plat[i] == 'Facebook') {
                fb = platF[i];
            }
            else if (plat[i] == 'Twitter') {
                tweet = platF[i];
            }
            else if (plat[i] == 'Blog') {
                blog = platF[i];
            }
            else
                console.log('No')

        }
        if (form.copy == true) {
            var copy = 'Yes'
        }
        var a = [form.y, form.i, form.f, form.t, form.b];
        for (let i = 0; i < a.length; i++) {
            if (a[i] == '< 2k') {
                this.dollar.push('$0 - $50');
            }
            else if (a[i] == '2k – 5k') {
                this.dollar.push('$50 - $75');
            }
            else if (a[i] == '5k - 10k') {
                this.dollar.push('$75 - $125');
            }
            else if (a[i] == '10k - 20k') {
                this.dollar.push('$125 - $225');
            }
            else if (a[i] == '20k – 100k') {
                this.dollar.push('$225 - $500');
            }
            else if (a[i] == '> 100k') {
                this.dollar.push('> $500');
            }
            else {
                this.dollar.push('');
            }
        }
        console.log('Survey form', form, this.dollar);
        const data = {
            "yourName": form.name,
            "yourEmail": email,
            "yourPhoneNumber": form.mobile,
            "yourBirthYear": form.year,
            "yourGender": form.gender,
            "platformYouUse": plat.toString(),//form.platform
            "topicYouPost": topic.toString(),
            "countriesYourFollowersLocated": form.country.toString(),
            "citiesYourFollowersLocated": form.city.toString(),
            "yourFollowersAgeBrackets": age.toString(),
            "percentageOfMaleFollowers": form.malePer,
            "percentageOfFemaleFollowers": form.femalePer,
            "percentageOfOtherFollowers": form.otherPer,
            "numberOfKids": form.kids,
            "theirAges": form.kidsAges,
            "numberOfDogsWillingToFeature": form.dogs,
            "numberOfCatsWillingToFeature": form.cats,
            "numberOfOtherAnimalsWillingToFeature": form.otherAnimal,
            "significantOtherWillingToFeature": form.will,
            "typeOfTravel": travelType.toString(), //form.travel
            "typeOfRoom": form.room,
            "typeOfFood": food.toString(),//form.food
            "interestedInWorkingWithBrands": form.brandWork,
            "youNeverWorkWithBrands": form.brandNoWork,
            "provideShortBioForBrands": form.bio,
            "yourFavoriteBrandToWorkWithSoFor": form.favBrand,
            "facebookPriceRange": this.dollar[2],
            "instagramPriceRange": this.dollar[1],
            "twitterPriceRange": this.dollar[3],
            "youtubePriceRange": this.dollar[0],
            "blogPriceRange": this.dollar[4],
            "facebookFollowers": form.f,
            "instagramFollowers": form.i,
            "twitterFollowers": form.t,
            "youtubeFollowers": form.y,
            "blogFollowers": form.b,
            "infl": {
                "influencerId": parseInt(id)
            }


        };

        console.log(data);

        return this.http.post(Links.SUBMITINFFORM, data).map((response: any) => response);
    }
    rateBrand(email, rating, infEmail, remark) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            reviewerEmailId: email,
            rating: rating,
            brandEmailId: infEmail,
            reviewRemark: remark
        }
        console.log(body);

        return this.http.post(Links.RATEBRAND, body).map((response: any) => response);
    }
    getReview(email) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            influencerEmailId: email,
        }
        console.log(body);

        return this.http.post(Links.GETREVIEW, body).map((response: any) => response);
    }
    payment(from, to, ut, amount, tax, taxamount, payable, orderId, paymentId, status) {
        var fromT, toT;
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        if (ut == 2) {
            fromT = 'influencer';
            toT = 'brand'
        }
        else {
            fromT = 'brand';
            toT = 'influencer'
        }
        if (status == 'COMPLETED')
            this.stat = 1
        else
            this.stat = 0
        const body = {
            "from": from,
            "to": to,
            "fromType": fromT,
            "toType": toT,
            "amount": amount,
            "tax": tax,
            "taxAmount": taxamount,
            "totalAmount": payable,
            "orderId": orderId,
            "paymentId": paymentId,
            "transactionStatus": this.stat

        }
        console.log(body);

        return this.http.post(Links.PAYPALPAYMENT, body).map((response: any) => response);
    }
    getTransacts(email, ut) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            from: email,
            fromType: ut
        }
        console.log(body);

        return this.http.post(Links.GETTRANSACTS, body).map((response: any) => response);
    }
}
