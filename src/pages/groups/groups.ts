import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AssistsPage} from "../assists/assists";
import {HttpClient} from "@angular/common/http";

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
  group: Group;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {

  }

  ionViewWillEnter(){
    this.http.get<Group>('http://homestead.test/groups/' + this.navParams.get('id')).subscribe(
      result => {
        this.group = result;
        console.log(this.group);
      });
  }

  backHome() {
    this.navCtrl.pop();
  }

  gotoAssist() {
    this.navCtrl.push(AssistsPage);
  }
}
