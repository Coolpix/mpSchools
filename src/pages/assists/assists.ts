import {Component, OnDestroy, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import moment from "moment";
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the AssistsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-assists',
  templateUrl: 'assists.html',
})
export class AssistsPage implements OnDestroy, OnInit{

  group: Group;
  lesson: Lesson;
  assists: any = [];
  private getLesson$: Subscription;
  private saveLesson$: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) { }

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
    this.saveLesson$ = this.http.put<Lesson>('http://clases-mp.eu-west-2.elasticbeanstalk.com/lessons/' + this.navParams.get('lessonId'), body).subscribe(
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

  ngOnDestroy(): void {
    if (this.getLesson$){
      this.getLesson$.unsubscribe();
    }
    if (this.saveLesson$){
      this.saveLesson$.unsubscribe();
    }
  }

  ngOnInit(): void {
    moment.locale('es');
    this.group = this.navParams.get('group');
    this.getLesson$ = this.http.get<Lesson>('http://clases-mp.eu-west-2.elasticbeanstalk.com/lessons/' + this.navParams.get('lessonId')).subscribe(
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
}
