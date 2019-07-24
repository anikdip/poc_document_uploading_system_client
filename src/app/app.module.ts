import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CreatePersonComponent } from './create-person/create-person.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { CreateDocumentTypeComponent } from './create-document-type/create-document-type.component';
import { DocumentTypeDetailsComponent } from './document-type-details/document-type-details.component';
@NgModule({
  declarations: [
    AppComponent,
    CreatePersonComponent,
    PersonListComponent,
    PersonEditComponent,
    PersonDetailsComponent,
    DocumentTypeComponent,
    CreateDocumentTypeComponent,
    DocumentTypeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
