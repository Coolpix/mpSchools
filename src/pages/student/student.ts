import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

/**
 * Generated class for the StudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
    let groupsData = this.http.get<Group[]>('http://homestead.test/groups');
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
    this.http.post<Group>('http://homestead.test/students', this.student, httpOptions).subscribe(
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
