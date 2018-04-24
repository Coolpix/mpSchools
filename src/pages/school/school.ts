import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

/**
 * Generated class for the SchoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-school',
  templateUrl: 'school.html',
})
export class SchoolPage {

  public school = {
    name: '',
    date_start: '',
    date_end: '',
    time_start: '',
    time_end: '',
    lessons: [],
    zone: '',
    students: []
  }

  days: string[];
  locations: Location[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    let locationsData = this.http.get<Location[]>('http://clases-mp.eu-west-2.elasticbeanstalk.com/zones');
    locationsData.subscribe(result => {
      this.locations = result;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolPage');
  }

  addSchool () {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.school.lessons = this.calculateLessons();
    this.http.post<Group>('http://clases-mp.eu-west-2.elasticbeanstalk.com/groups', this.school, httpOptions).subscribe(
      result => {
        this.backHome();
      },
      error => {
        console.log(error);
      }
    );
  }

  getDaysFromMonth(year: number, month: string, days: Array<string>){
    let getTot = daysInMonth(month, year);
    let daysOfMonth = [];

    for(let i=1;i<=getTot;i++){
      let newDate = new Date(year, parseInt(month),i);
      for (let x=0;x<days.length;x++){
        if(newDate.getDay() == parseInt(days[x])){
          daysOfMonth.push(i);
        }
      }
    }

    return daysOfMonth;

    function daysInMonth(month,year) {
      return new Date(parseInt(year), parseInt(month), 0).getDate();
    }
  }

  backHome() {
    this.navCtrl.pop();
  }

  calculateLessons(){
    let years = [new Date(this.school.date_start).getFullYear(), new Date(this.school.date_end).getFullYear()];
    let startMonth = new Date(this.school.date_start).getMonth();
    let endMonth = new Date(this.school.date_end).getMonth();
    let monthsStartYear = [];
    let monthsEndYear = [];
    let daysOfClass = [];

    if (years[0]===years[1]){
      for (let i=startMonth; i<=endMonth; i++) {
        monthsStartYear.push(i);
      }
    } else {
      for (let i=startMonth; i<=11; i++) {
        monthsStartYear.push(i);
      }
    }

    if (years[0] !== years[1]) {
      for (let i=0; i<=endMonth; i++) {
        monthsEndYear.push(i);
      }
    } else {
      monthsEndYear = [];
    }


    for (let x=0; x<monthsStartYear.length; x++) {
      let daysFromMonth = this.getDaysFromMonth(years[0], monthsStartYear[x], this.days);
      for (let i=0; i<daysFromMonth.length; i++) {
        let arrayDateToInsert = new Date(years[0], monthsStartYear[x], daysFromMonth[i]).toLocaleDateString().split('/');
        let dateToInsert = arrayDateToInsert[2]+'-'+arrayDateToInsert[1]+'-'+arrayDateToInsert[0];
        daysOfClass.push({
          'date': dateToInsert,
          'students': []
        });
      }
    }

    for (let x=0; x<monthsEndYear.length; x++) {
      let daysFromMonth = this.getDaysFromMonth(years[1], monthsEndYear[x], this.days);
      for (let i=0; i<daysFromMonth.length; i++) {
        let arrayDateToInsert = new Date(years[1], monthsEndYear[x], daysFromMonth[i]).toLocaleDateString().split('/');
        let dateToInsert = arrayDateToInsert[2]+'-'+arrayDateToInsert[1]+'-'+arrayDateToInsert[0];
        daysOfClass.push({
          'date': dateToInsert,
          'students': []
        });
      }
    }
    return daysOfClass;
  }
}
