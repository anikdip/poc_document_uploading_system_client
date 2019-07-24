import { Component, OnInit } from '@angular/core';
import {PersonService} from "../person.service";
import {DocumentType} from "../document-type";

@Component({
  selector: 'app-create-document-type',
  templateUrl: './create-document-type.component.html',
  styleUrls: ['./create-document-type.component.css']
})
export class CreateDocumentTypeComponent implements OnInit {

  documentType: DocumentType = new DocumentType();
  submitted = false;

  constructor(private personService: PersonService) { }

  ngOnInit() {
  }

  save() {
    this.personService.createDocumentType(this.documentType)
      .subscribe(data => console.log(data), error => console.log(error));
    this.documentType = new DocumentType();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
