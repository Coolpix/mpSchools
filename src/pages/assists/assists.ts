import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import moment from "moment";

/**
 * Generated class for the AssistsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assists',
  templateUrl: 'assists.html',
})
export class AssistsPage {

  group: Group;
  lesson: Lesson;
  assists: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    moment.locale('es');
    this.group = this.navParams.get('group');
    this.http.get<Lesson>('http://homestead.test/lessons/' + this.navParams.get('lessonId')).subscribe(
      result => {
        this.lesson = result;
        this.lesson.date = moment(this.lesson.date).format('LL');
      });
  }

  modifyAssist(studentId){
    console.log(studentId);
  }

  saveAssists() {
    this.navCtrl.pop();
  }

  backHome() {
    this.navCtrl.pop();
  }
}
