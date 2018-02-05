import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssistsPage } from './assists';

@NgModule({
  declarations: [
    AssistsPage,
  ],
  imports: [
    IonicPageModule.forChild(AssistsPage),
  ],
})
export class AssistsPageModule {}
