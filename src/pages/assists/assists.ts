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
        const notFormatedDate = result.date;
        for (let i = 0; i < this.lesson.students.length; i++){
          this.assists.push(this.lesson.students[i].id);
        }
        this.lesson.date = moment(this.lesson.date).format('LL');
        this.lesson.notFormatedDate = notFormatedDate;
      });
  }

  modifyAssist(student){
    let studentIndex = this.assists.indexOf(student.id);
    if (studentIndex > -1){
      this.assists.splice(studentIndex, 1);
    }else{
      this.assists.push(student.id);
    }
  }

  saveAssists() {
    const body = {
      date: this.lesson.notFormatedDate,
      students: this.assists
    };
    this.http.put<Lesson>('http://homestead.test/lessons/' + this.navParams.get('lessonId'), body).subscribe(
      result => {
        console.log(result);
        this.navCtrl.pop();
      },
      error => {
        console.log('Error actualizando asistencias.')
      });
  }

  hasAttended(student){
    return this.assists.indexOf(student.id) > -1;
  }

  backHome() {
    this.navCtrl.pop();
  }
}
