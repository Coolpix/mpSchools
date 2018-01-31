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
  groupName: any;
  groupId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.groupId = navParams.get('id');
    this.groupName = navParams.get('name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

  backHome() {
    this.navCtrl.pop();
  }

}
