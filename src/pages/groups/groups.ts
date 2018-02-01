import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  groupTime: any;
  groupPhoto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.groupId = navParams.get('id');
    this.groupLocation = navParams.get('location');
    this.groupName = navParams.get('name');
    this.groupTime = navParams.get('time');
    this.groupPhoto = navParams.get('photo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

  backHome() {
    this.navCtrl.pop();
  }

}
