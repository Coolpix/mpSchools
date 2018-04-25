import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

/**
 * Generated class for the StudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-zone',
  templateUrl: 'zone.html',
})
export class ZonePage {

  public zone = {
    name: '',
    latitude: '',
    longitude: '',
    groups: [],
    courses: []
  }

  groups: Group[];

  constructor(public navCtrl: NavController, private http: HttpClient) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentPage');
  }

  addZone () {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post<Zones>('http://clases-mp.eu-west-2.elasticbeanstalk.com/zones', this.zone, httpOptions).subscribe(
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
    console.log(this.zone);
  }

}
