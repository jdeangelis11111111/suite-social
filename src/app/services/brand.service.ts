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
export class BrandService {
    private data = new BehaviorSubject<any>(null);
    currentTempRole = this.data.asObservable();
    updTempRole(dataUpd: null): any {
        this.data.next(dataUpd);
    }
    private messageSource = new Subject<any>();
    // currentLogin = this.messageSource.asObservable();
    private subject = new Subject<any>();

    encryptSecretKey = '91e@0#5a942@@9ef';

    constructor(private http: HttpClient) { }


    submitBrandForm(form, email, id) {
        const token = localStorage.getItem('jwtToken');
        const formData = new FormData();
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        if (form.copy == true) {
            var copy = 'yes'
        }
        else
            copy = 'no'
        console.log('Survey form', form);
        const data = {
            "yourName": form.name,
            "yourcompanyName": form.cName,
            "productCategory": form.categPro,
            "overallBudget": form.budget,
            "noOfInfluencer": form.hireInf,
            "describeYourBrand": form.desc,
            "ageForCampaign": form.age,
            "socialMediaPlatform": form.platform,
            "yourCampaignTimeline": form.timeline,
            "yourEmail": email,
            "yourPhoneNumber": form.mobile,
            "methodOfCommunication": form.communicate,
            "copyOfResponse": copy,
            "org": {
                "organzationId": parseInt(id)
            }


        };
        console.log(data);
        return this.http.post(Links.SUBMITBRANDFORM, data).map((response: any) => response);
    }
    getAllInfluencer() {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        return this.http.get(Links.GETALLINF).map((response: any) => response);
    }
    viewSearchInf(search, topic, plat, rate, city, age, platF, index, pageSize) {
        console.log(search, topic, plat, city, age, platF);

        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        var blog = null, youtubeFollowers = null, insta = null, fb = null, tweet = null;
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
        if (city == '')
            city = [];
        if (search == '')
            search = null;
        if (topic.length == 0)
            topic = [];
        if (plat.length == 0)
            var platInf = [];     // "platformYouUse": platInf,       // "theirAges": null,
        const body = {
            "searchByCityOrName": search,
            "topicYouPost": topic,
            "citiesYourFollowersLocated": city,
            "yourFollowersAgeBrackets": age,
            "facebookFollowers": fb,
            "instagramFollowers": insta,
            "twitterFollowers": tweet,
            "youtubeFollowers": youtubeFollowers,
            "blogFollowers": blog,
            averageRating: parseInt(rate)
        }
        console.log(body);

        return this.http.post(Links.GETSEARCHINF, body).map((response: any) => response);
    }
    sendMsg(form, fromId, toId) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            messageTitle: form.title,
            messageBody: form.body,
            from: fromId,
            to: toId,
            senderType: 1,
            // toType: 1,
            // outbound:1

        }
        console.log(body);

        return this.http.post(Links.SENDMSG, body).map((response: any) => response);
    }
    getMsgs(email, ut) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            'messageIdentifiers': email,
            'senderType': ut
        }
        console.log(body);

        return this.http.post(Links.GETALLMSG, body).map((response: any) => response);
    }
    getDetailMsgs(email, ut, msg) {
        console.log(msg)
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            /*  id: msg.id,
             from: null,
             to: null,
             // messageTitle: null,
             // messageBody:null,
             senderType: null, */
            "email": msg.email,
            "messageIdentifier": email,
            "senderType": ut

        }
        console.log(body);

        return this.http.post(Links.GETDETAILMSG, body).map((response: any) => response);
    }
    postCamp(form, email, files) {
        console.log(files)
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const formData = new FormData();
        if (files) {
            for (var i = 0; i < files.length; i++)
                formData.append('file', files[i], files[i].name);
        }
        formData.append('campaignTitle', form.title.trim());
        formData.append('subTitle', '');
        formData.append('aboutCampaigning', form.body.trim());
        // formData.append('senderType', fromId);
        // formData.append('from', '1');
        formData.append('startDate', form.startDate);
        formData.append('endDate', form.endDate);
        formData.append('organizationEmail', email)


        formData.forEach((value, key) => {
            console.log("key %s: value %s", key, value);
        });
        return this.http.post(Links.POSTCAMPAIGN, formData).map((response: any) => response);
    }
    deleteMsg(id) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            id: id
        }
        console.log(body);

        return this.http.post(Links.DELETEMSG, body).map((response: any) => response);
    }
    getPosts(email) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            "organizationEmail": email
        }
        console.log(body);

        return this.http.post(Links.GETPOSTBYEMAIL, body).map((response: any) => response);
    }
    getReview(email) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            brandEmailId: email,
        }
        console.log(body);

        return this.http.post(Links.GETREVIEWB, body).map((response: any) => response);
    }
    getBrand(email) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            "yourEmail": email
        }
        console.log(body);

        return this.http.post(Links.GETFORM, body).map((response: any) => response);
    }
    getCampCount(email) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            "organizationEmail": email
        }
        console.log(body);

        return this.http.post(Links.GETCAMPCOUNT, body).map((response: any) => response);
    }
    updateBrandForm(form, email, id) {
        const token = localStorage.getItem('jwtToken');
        const formData = new FormData();
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        if (form.copy == true) {
            var copy = 'yes'
        }
        else
            copy = 'no'
        console.log('Survey form', form);
        if (form.platform == '' || form.platform == 'Others') {
            var socialMediaPlatform = form.platformO
        }
        else {
            socialMediaPlatform = form.platform
        }
        if (form.categPro == '' || form.categPro == 'Others') {
            var productCategory = form.categProO
        }
        else {
            productCategory = form.categPro
        }
        const data = {
            "yourName": form.name,
            "yourcompanyName": form.cName,
            "productCategory": productCategory,
            "overallBudget": form.budget,
            "noOfInfluencer": form.hireInf,
            "describeYourBrand": form.desc,
            "ageForCampaign": form.age,
            "socialMediaPlatform": socialMediaPlatform,//form.platform,
            "yourCampaignTimeline": form.timeline,
            "yourEmail": email,
            "yourPhoneNumber": form.mobile,
            "methodOfCommunication": form.communicate,
            "copyOfResponse": copy,
            "org": {
                "organzationId": parseInt(id)
            }


        };
        console.log(data);
        return this.http.post(Links.UPDBRANDFORM, data).map((response: any) => response);
    }
    rateInf(email, rating, infEmail, remark) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            reviewerEmailId: email,
            rating: rating,
            influencerEmailId: infEmail,
            reviewRemark: remark
        }
        console.log(body);

        return this.http.post(Links.RATEINF, body).map((response: any) => response);
    }
    getImg(email, ut) {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const body = {
            "email": email,
            "userType": ut
        }
        console.log(body);

        return this.http.post(Links.GETIMG, body).map((response: any) => response);
    }
    updateImg(email, ut, files) {
        console.log(email, ut, files);

        const token = localStorage.getItem('jwtToken');
        const httpOptions = { headers: new HttpHeaders().set('Authorization', token) };
        const formData = new FormData();
        if (files) {
            formData.append('file', files, files.name);
        }
        formData.append('Email', email);
        formData.append('ut', ut);

        return this.http.post(Links.UPDIMG, formData).map((response: any) => response);
    }
}