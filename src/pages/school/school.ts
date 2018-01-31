import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GroupsPage} from "../groups/groups";
import {HomePage} from "../home/home";

/**
 * Generated class for the SchoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-school',
  templateUrl: 'school.html',
})
export class SchoolPage {

  public locationSelected: string;

  public locations = [
    {
      "name": "Retiro",
      "value": 1
    },
    {
      "name": "Alcobendas",
      "value": 2
    }
  ];

  public event = {
    dateStart: '2017-08-01',
    dateEnd: '2018-06-20',
    timeStart: '19:00',
    timeEnd: '20:00'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolPage');
  }

  backHome() {
    this.navCtrl.pop();
  }

}
