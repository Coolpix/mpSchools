import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the SchoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-school',
  templateUrl: 'school.html',
})
export class SchoolPage {

  public school = {
    name: '',
    dateStart: '',
    dateEnd: '',
    timeStart: '',
    timeEnd: '',
    days: [],
    location: ''
  }

  locations: Location[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    let locationsData = this.http.get<Location[]>('http://homestead.test/zones');
    locationsData.subscribe(result => {
      this.locations = result;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolPage');
  }

  addSchool(){
   this.school.days = this.calculateLessons();
   console.log(this.school);
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
    let years = [new Date(this.school.dateStart).getFullYear(), new Date(this.school.dateEnd).getFullYear()];
    let startMonth = new Date(this.school.dateStart).getMonth();
    let endMonth = new Date(this.school.dateEnd).getMonth();
    let monthsStartYear = [];
    let monthsEndYear = [];
    let daysOfClass = [];
    for (let i=startMonth; i<=11; i++) {
      monthsStartYear.push(i);
    }

    if (years[0] !== years[1]) {
      for (let i=0; i<=endMonth; i++) {
        monthsEndYear.push(i);
      }
    } else {
      monthsEndYear = [];
    }


    for (let x=0; x<monthsStartYear.length; x++) {
      let arrayOfMonth = [];
      let daysFromMonth = this.getDaysFromMonth(years[0], monthsStartYear[x], this.school.days);
      for (let i=0; i<daysFromMonth.length; i++) {
        arrayOfMonth.push(new Date(years[0], monthsStartYear[x], daysFromMonth[i]));
      }
      daysOfClass.push(arrayOfMonth);
    }

    for (let x=0; x<monthsEndYear.length; x++) {
      let arrayOfMonth = [];
      let daysFromMonth = this.getDaysFromMonth(years[1], monthsEndYear[x], this.school.days);
      for (let i=0; i<daysFromMonth.length; i++) {
        arrayOfMonth.push(new Date(years[1], monthsEndYear[x], daysFromMonth[i]));
      }
      daysOfClass.push(arrayOfMonth);
    }

    return daysOfClass;
  }
}
