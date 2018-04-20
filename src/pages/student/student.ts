import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

/**
 * Generated class for the StudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {

  public student = {
    name: '',
    phone_number: '',
    gender: '',
    email: '',
    groups: '',
    lessons: []
  }

  groups: Group[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    let groupsData = this.http.get<Group[]>('http://clases-mp.eu-west-2.elasticbeanstalk.com/groups');
    groupsData.subscribe(
      result => {
      this.groups = result;
    },
      error => {
        console.log(error);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentPage');
  }

  addStudent () {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post<Group>('http://clases-mp.eu-west-2.elasticbeanstalk.com/students', this.student, httpOptions).subscribe(
      result => {
        this.backHome();
      },
      error => {
        console.log(error);
      }
    );
  }

  backHome() {
    this.navCtrl.pop();
  }

  getData(){
    console.log(this.student);
  }

}
