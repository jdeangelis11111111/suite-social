import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BrandService } from 'app/services/brand.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { InfluencerService } from 'app/services/influencer.service';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'flag-icon-us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'flag-icon-es'
  }]
  currentLang = this.availableLangs[0];

  public egretThemes;
  public layoutConf: any;
  ut: string;
  hasImg: boolean;
  email: string;
  data: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  name: any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService, public snackBar: MatSnackBar,
    public translate: TranslateService, private influencerService: InfluencerService,
    private renderer: Renderer2, private router: Router, private service: BrandService
  ) {
    this.ut = localStorage.getItem('userType');
    this.email = localStorage.getItem('email');
    /*   this.service.getImg(this.email, this.ut).subscribe(Resp => {
        console.log(Resp);
        if (Resp.response == '200') {
          this.data = Resp;
          this.hasImg = true;
          this.imgURL = Resp.Img;
        }
        else {
          this.hasImg = false;
        }
      }) */
    if (this.ut == '1') {
      this.service.getBrand(this.email).subscribe(Resp => {
        this.data = Resp.list[0];
        this.name = this.data.yourName;
      })
    }
    else {
      this.influencerService.getInf(this.email).subscribe(Resp => {

        this.data = Resp.list[0];
        this.name = this.data.yourName;
      })
    }
  }
  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang.code);
  }
  setLang(lng) {
    this.currentLang = lng;
    this.translate.use(lng.code);
  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, { transitionClass: true })
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, { transitionClass: true })

  }

  onSearch(e) {
    //   console.log(e)
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
    window.location.reload()
  }
  inbox() {
    if (this.ut == '1')
      this.router.navigate(['/content/brand/inboxB'])
    else if (this.ut == '2')
      this.router.navigate(['/content/influencer/inboxInf'])
  }
  public imagePath;
  imgURL: any;
  public message: string;
  Imgsrc: any;
  file: any[]
  onProfileImg(event) {
    console.log(event);

    this.file = [];
    // if (event.target.files[0].size > 1000000 || event.target.files[0].size < 10000) {
    if (event.target.files.length != 0) {
      if (event.target.files[0].type != "image/png" && event.target.files[0].type != "image/jpeg") {

        this.openSnackBar2('Image Only');

      }
    }
    else {
      this.Imgsrc = undefined;
      this.imgURL = this.data.img;
    }
    const target = event.target || event.srcElement;

    var reader = new FileReader();
    this.imagePath = event.target.files;
    if (event.target.files.length != 0)
      reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.hasImg = true;
    }
    if (target.files.length !== 0) {
      this.file = target.files;
      this.Imgsrc = this.file[0];
      this.updateProfile();
    }
    console.log(this.hasImg, 'ok', this.Imgsrc, 'ok2', this.imgURL);

  }
  updateProfile() {
    this.service.updateImg(this.email, this.ut, this.Imgsrc).subscribe(resp => {
      if (resp.response == '200') {
        this.openSnackBar('Profile updation successful')
      }
      else {
        this.openSnackBar2('Problem updating profile')
      }
    })
  }
  openSnackBar(message) {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openSnackBar2(message) {
    this.snackBar.open(message, 'Please Try Again', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}