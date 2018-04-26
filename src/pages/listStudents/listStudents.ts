import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-students',
  templateUrl: 'listStudents.html',
})
export class ListStudentsPage {
  students: any;
  arrayOfLetters: String[] = [];

  constructor(public navCtrl: NavController, private http: HttpClient) {
    this.http.get<Student[]>('http://clases-mp.eu-west-2.elasticbeanstalk.com/students').subscribe(
      result => {
        this.students = result.sort(function(a,b) {
          if (a.name.toUpperCase().trim().split('')[0] > b.name.toUpperCase().trim().split('')[0]) {
            return 1;
          }
          if (a.name.toUpperCase().trim().split('')[0] < b.name.toUpperCase().trim().split('')[0]) {
            return -1;
          }
          return 0;
        });
        this.createArrayLetters(this.students);
      });
  }

  backHome() {
    this.navCtrl.pop();
  }

  createArrayLetters(students: Student[]){
    let arrayOfNames = [];
    let arrayOfLetterName = [];
    for (let i=0; i<students.length; i++){
      if (arrayOfLetterName.length === 0){
        arrayOfLetterName.push(students[i].name.trim());
        this.arrayOfLetters.push(students[i].name.toUpperCase().trim().split('')[0]);
      }else{
        let letterToCheck = students[i].name.toUpperCase().trim().split('')[0];
        if (letterToCheck === students[i-1].name.toUpperCase().trim().split('')[0]){
          arrayOfLetterName.push(students[i].name.trim())
        }else{
          arrayOfNames.push(arrayOfLetterName);
          arrayOfLetterName = [];
          arrayOfLetterName.push(students[i].name.trim());
          this.arrayOfLetters.push(students[i].name.toUpperCase().trim().split('')[0]);
        }
        if (i === students.length -1){
          arrayOfNames.push(arrayOfLetterName);
        }
      }
    }
    this.students = arrayOfNames;
    console.log(arrayOfNames);
    console.log(this.arrayOfLetters);
  }
}
