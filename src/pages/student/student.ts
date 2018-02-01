import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

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
    group: ''
  }

  groups: Group[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    let groupsData = this.http.get<Group>('../assets/groups.json');
    groupsData.subscribe(result => {
      this.groups = result.items;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentPage');
  }

  backHome() {
    this.navCtrl.pop();
  }

  getData(){
    console.log(this.student);
  }

}
