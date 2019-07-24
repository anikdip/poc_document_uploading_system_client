import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DocumentType} from "../document-type";
import {PersonService} from "../person.service";
import {DocumentTypeFields} from "../document-type-fields";
import {Nid} from "../nid";
import {Router} from "@angular/router";

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.css']
})
export class DocumentTypeComponent implements OnInit {

  documentType: Observable<DocumentType[]>;

  documentTypeFields: DocumentTypeFields = new DocumentTypeFields();

  documentTypeUpdate: DocumentType = new DocumentType();

  constructor(private personService: PersonService, private router: Router) {
    console.log(personService);
  }

  ngOnInit() {
    this.reloadDocumentType();
  }

  reloadDocumentType(){
    this.documentType = this.personService.getDocumentTypeList();
  }

  onSubmitAddField(document_type_id){
    this.documentTypeFields.document_type_id = document_type_id;
    this.saveDocumentTypeFields();
    this.reloadDocumentType();
    (document.querySelector('.modal-backdrop') as HTMLElement).remove();
  }

  saveDocumentTypeFields(){
    this.personService.createDocumentTypeField(this.documentTypeFields)
      .subscribe(data => console.log(data), error => console.log(error));
    this.documentTypeFields = new DocumentTypeFields();
  }

  onSubmitUpdate(id){
    this.personService.updateDocumentType(id, this.documentTypeUpdate)
      .subscribe(data => console.log(data), error => console.log(error));

    this.reloadDocumentType();
    this.documentTypeUpdate = new DocumentType();
    (document.querySelector('.modal-backdrop') as HTMLElement).remove();
  }

  deleteDocumentType(id: number) {
    this.personService.deleteDocumentType(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadDocumentType();
        },
        error => console.log(error));
  }

  detailsDocumentType(id: number): void {
    localStorage.setItem('documentTypeId', id.toString());
    this.router.navigate(['documentTypeDetails']);
  }

}
