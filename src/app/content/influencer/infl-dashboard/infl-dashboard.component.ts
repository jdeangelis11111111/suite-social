import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InfluencerService } from 'app/services/influencer.service';
// import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'app/services/login.service';
import { InfCardComponent } from '../inf-card/inf-card.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-infl-dashboard',
  templateUrl: './infl-dashboard.component.html',
  styleUrls: ['./infl-dashboard.component.scss']
})
export class InflDashboardComponent implements OnInit {
  some: any;
  formPer: boolean;
  year: number;
  see: any;
  checkRoute = '';
  parent: string[];
  data: any;
  followByLocations: any;
  trafficSourcesChart: any;
  view: any[] = [470, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';
  colorScheme = {
    domain: ['rgb(234, 52, 65)', 'rgb(247, 111, 116)', 'rgb(234, 52, 65)', 'rgb(247, 111, 116)']
  };
  pieData: { value: number; name: string; }[];
  email: string;
  dollar: any[] = [];
  constructor(private router: Router, private cdRef: ChangeDetectorRef, public dialog: MatDialog, private loginService: LoginService, private formBuilder: FormBuilder/* , private toastr: ToastrService */, private influencerService: InfluencerService, ) {
    this.email = localStorage.getItem('email');
    this.getData();
    this.parent = this.router.url.split('/');
    this.checkRoute = this.parent[this.parent.length - 1];
    console.log('chekc', this.parent, this.checkRoute)

    var a = localStorage.getItem('survey');
    if (a == 'true')
      this.some = a
    else
      this.some = false;
    console.log('here', a, this.some);
    this.pieData = [
      {
        value: 335,
        name: "Male"
      },
      {
        value: 400,
        name: "Female"
      },
      { value: 148, name: "Not Specified" }
    ]
    this.trafficSourcesChart = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      color: [
        // "rgba(15, 21, 77, .6)",
        "rgb(235, 71, 82)",
        // "rgba(244, 67, 54, .7)",
        // "rgba(15, 21, 77, 0.7)",
        "rgb(234, 52, 65)",
        "rgb(243, 95, 106)",
        // "rgba(15, 21, 77, 0.8)"

      ],
      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Sessions",
          type: "pie",
          radius: ["55%", "85%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,
          label: {
            normal: {
              show: false,
              position: "center",
              textStyle: {
                fontSize: "13",
                fontWeight: "normal"
              },
              formatter: "{a}"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "15",
                fontWeight: "normal",
                color: "rgba(15, 21, 77, 1)"
              },
              formatter: "{b} \n{c} ({d}%)"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.pieData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
    this.followByLocations = [{ 'name': 'China', 'value': '2000' }, { 'name': 'US', 'value': '1000' }, { 'name': 'Brazil', 'value': '500' }, { 'name': 'India', 'value': '1000' }]
  }

  ngOnInit() {
    if (this.some == false) {
      console.log('here')
      if (this.checkRoute != 'InfluencerDash')
        this.openDialogue();
    }
  }
  getData() {
    this.influencerService.getInf(this.email).subscribe(Resp => {
      console.log(Resp);
      this.dollar = []
      if (Resp.response == 200) {
        this.data = Resp.list[0];
        var a = [this.data.youtubeFollowers, this.data.facebookFollowers, this.data.twitterFollowers, this.data.instagramFollowers, this.data.blogFollowers]
        for (let i = 0; i < a.length; i++) {
          if (a[i] == '<2k') {
            this.dollar.push('$0 - $50');
          }
          else if (a[i] == '2k - 5k') {
            this.dollar.push('$50 - $75');
          }
          else if (a[i] == '5k - 10k') {
            this.dollar.push('$75 - $125');
          }
          else if (a[i] == '10k - 20k') {
            this.dollar.push('$155 - $225');
          }
          else if (a[i] == '20k - 100k') {
            this.dollar.push('$225 - $500');
          }
          else if (a[i] == '> 100k') {
            this.dollar.push('$500 - $1000');
          }
          else {
            this.dollar.push('');
          }
        }

        console.log(this.data);
        this.cdRef.detectChanges()
      }
    })
  }
  logout() {
    this.loginService.logout();
  }
  openDialogue() {

    if (this.some == false) {
      const dialogApp = this.dialog.open(InfCardComponent, {
        height: '550px',
        width: '700px',
        disableClose: true,
        data: { 'type': 'survey' }
      });
      dialogApp.afterClosed().subscribe(result => {
        this.getData();
      });
    }
  }
  close() {
    this.some = true;
  }
}
