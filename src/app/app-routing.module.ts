import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreatePersonComponent} from "./create-person/create-person.component";
import {PersonListComponent} from "./person-list/person-list.component";
import {PersonEditComponent} from "./person-edit/person-edit.component";
import {PersonDetailsComponent} from "./person-details/person-details.component";

const routes: Routes = [
  { path: '', redirectTo: 'person', pathMatch: 'full' },
  { path: 'addPerson', component: CreatePersonComponent },
  { path: 'person', component: PersonListComponent },
  { path: 'editPerson', component: PersonEditComponent },
  { path: 'detailsPerson', component: PersonDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
