import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import { GroupsPage } from "../groups/groups";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  zones: Zones[];

  constructor(public navCtrl: NavController, private http: HttpClient, public alertCtrl: AlertController) {}

  openPageGroups(zoneName, group) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(GroupsPage ,{
      id: group.id
    });
  }

  ionViewWillEnter(){
    let zoneData = this.http.get<Group[]>('http://clases-mp.eu-west-2.elasticbeanstalk.com/zones');
    zoneData.subscribe(result => {
      this.zones = result;
    });
  }

  deleteGroup(idGroup) {
    let confirm = this.alertCtrl.create({
      title: '¿Seguro que desea borrar este grupo?',
      message: 'Los cambios no se podrán deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.http.delete('http://clases-mp.eu-west-2.elasticbeanstalk.com/groups/' + idGroup).subscribe();
          }
        }
      ]
    });
    confirm.present();
  }

}
