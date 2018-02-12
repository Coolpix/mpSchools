import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AssistsPage} from "../assists/assists";

/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  groupId: any;
  groupLocation: any;
  groupName: any;
  groupTimeStart: any;
  groupTimeEnd: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
    this.groupId = navParams.get('id');
    this.groupLocation = navParams.get('location');
    this.groupName = navParams.get('name');
    this.groupTimeStart = navParams.get('time_start');
    this.groupTimeEnd = navParams.get('time_end');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

  backHome() {
    this.navCtrl.pop();
  }

  gotoAssist(){
    this.navCtrl.push(AssistsPage);
  }
}
