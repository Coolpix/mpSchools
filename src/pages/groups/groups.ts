import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AssistsPage} from "../assists/assists";
import {HttpClient} from "@angular/common/http";
import moment from 'moment';

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
  dateOfLessons: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    moment.locale('es');
    this.http.get<Group>('http://clases-mp.eu-west-2.elasticbeanstalk.com/groups/' + this.navParams.get('id')).subscribe(
      result => {
        this.group = result;
        this.createMonths(this.group.lessons);
      });
  }

  backHome() {
    this.navCtrl.pop();
  }

  gotoAssist(lessonId) {
    this.navCtrl.push(AssistsPage,{
      group: this.group,
      lessonId: lessonId
    });
  }

  createMonths(lessons){
    let dateOfLessons: any = [];
    let lessonsOfMonth: any = [];
    for (let i=0;i<lessons.length;i++){
      let month =  new Date(lessons[i].date).getMonth();
      lessons[i].datePretty = moment(lessons[i].date).format('LL');
      lessons[i].nameMonth = moment(lessons[i].date).format('MMMM YYYY').replace(/\b\w/g, l => l.toUpperCase());
      if (lessonsOfMonth.length === 0){
        lessonsOfMonth.push(lessons[i]);
      }else{
        if (new Date(lessonsOfMonth[0].date).getMonth() === month){
          lessonsOfMonth.push(lessons[i]);
        }else{
          dateOfLessons.push(lessonsOfMonth);
          lessonsOfMonth = [];
          lessonsOfMonth.push(lessons[i]);
        }
      }
    }
    dateOfLessons.push(lessonsOfMonth);
    this.dateOfLessons = dateOfLessons;
  }
}
