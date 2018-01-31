import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {GroupsPage} from "../pages/groups/groups";
import {HttpClient} from "@angular/common/http";
import {StudentPage} from "../pages/student/student";
import {SchoolPage} from "../pages/school/school";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  information: Menu[];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private http: HttpClient) {
    this.initializeApp();

    let localData = this.http.get<Menu>('../assets/info.json');
    localData.subscribe(result => {
      this.information = result.items;
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPageGroups(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(GroupsPage ,{
      id: page.id,
      name: page.name
    });
  }

  openPageSchool() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(SchoolPage);
  }

  openPageStudent() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(StudentPage);
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }
}
