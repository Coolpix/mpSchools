import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GroupsPage} from "../groups/groups";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  groups: Group[];

  constructor(public navCtrl: NavController, private http: HttpClient) {
    let groupsData = this.http.get<Group>('../assets/groups.json');
    groupsData.subscribe(result => {
      this.groups = result.items;
    })
  }

  openPageGroups(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(GroupsPage ,{
      id: page.id,
      location: page.location,
      name: page.name,
      time: page.time,
      photo: page.photo
    });
  }

}
