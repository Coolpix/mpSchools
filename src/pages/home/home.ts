import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GroupsPage } from "../groups/groups";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  zones: Zones[];

  constructor(public navCtrl: NavController, private http: HttpClient) {
    let groupsData = this.http.get<Group[]>('http://homestead.test/zones');
    groupsData.subscribe(result => {
      this.zones = result;
    })
  }

  openPageGroups(zoneName, group) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(GroupsPage ,{
      id: group.id,
      location: zoneName,
      name: group.name,
      time_start: group.time_start,
      time_end: group.time_end
    });
  }

}
