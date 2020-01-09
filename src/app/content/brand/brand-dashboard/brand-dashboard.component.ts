import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'app/services/brand.service';
// import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'app/services/login.service';
import { BrandCardComponent } from '../brand-card/brand-card.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-brand-dashboard',
  templateUrl: './brand-dashboard.component.html',
  styleUrls: ['./brand-dashboard.component.scss']
})
export class BrandDashboardComponent implements OnInit {

  somee: any;
  checkRoute = '';
  parent: string[];
  email: any;
  data: any;
  followByLocations: any;
  pieData: any;
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
  campCount: any;
  constructor(private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private router: Router, public dialog: MatDialog, private formBuilder: FormBuilder, private brandService: BrandService, private loginService: LoginService, /* private toastr: ToastrService */) {
    this.email = localStorage.getItem('email');
    
    this.getData();
    this.parent = this.router.url.split('/');
    this.checkRoute = this.parent[this.parent.length - 1]
    console.log('chekc', this.parent, this.checkRoute)
    var a = localStorage.getItem('survey');
    if (a == 'true')
      this.somee = a
    else
      this.somee = false;
    console.log('here', a, this.somee);
    if (this.somee == false) {
      console.log('here', this.checkRoute)
      if (this.checkRoute != 'brandDash') {
        console.log(this.checkRoute);

        this.openDialogue();
      }

    }
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
    this.followByLocations = [{ 'name': 'China', 'value': '2000' }, { 'name': 'US', 'value': '1000' }, { 'name': 'India', 'value': '1000' }]

    //this.triggerFalseClick();
  }
  getData() {
    this.brandService.getBrand(this.email).subscribe(Resp => {
      console.log(Resp);

      if (Resp.response == 200) {
        this.data = Resp.list[0];
        console.log(this.data);
        this.cdRef.detectChanges()
      }
    })
    this.brandService.getCampCount(this.email).subscribe(Resp => {
      console.log(Resp);

      if (Resp.response == 200) {
        this.campCount=Resp.count;
        this.cdRef.detectChanges()
      }
    })
  }
  ngOnInit() {

  }
  openDialogue() {

    const dialogApp = this.dialog.open(BrandCardComponent, {
      height: '550px',
      width: '700px',
      disableClose: true,
      data: { 'type': 'survey', email: '' }
    });
    dialogApp.afterClosed().subscribe(result => {
      this.getData();
    });

  }

  close() {
    this.somee = true;
  }
  logout() {
    this.loginService.logout();
  }

}