import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {GroupsPage} from "../pages/groups/groups";
import {HttpClientModule} from "@angular/common/http";
import {SchoolPage} from "../pages/school/school";
import {StudentPage} from "../pages/student/student";
import {ComponentsModule} from "../components/components.module";
import {AssistsPage} from "../pages/assists/assists";
import {ZonePage} from "../pages/zones/zone";
import {CoursesPage} from "../pages/courses/courses";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GroupsPage,
    SchoolPage,
    StudentPage,
    AssistsPage,
    ZonePage,
    CoursesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp,{
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthShortNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
      dayShortNames: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GroupsPage,
    SchoolPage,
    StudentPage,
    AssistsPage,
    ZonePage,
    CoursesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
