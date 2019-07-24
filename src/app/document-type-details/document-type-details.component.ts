import { Component, OnInit } from '@angular/core';
import {DocumentTypeFields} from "../document-type-fields";
import {PersonService} from "../person.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {DocumentType} from "../document-type";

@Component({
  selector: 'app-document-type-details',
  templateUrl: './document-type-details.component.html',
  styleUrls: ['./document-type-details.component.css']
})
export class DocumentTypeDetailsComponent implements OnInit {

  documentType: DocumentType[] = [];
  documentTypeDetails: Observable<DocumentTypeFields[]>;

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    this.showDocumentTypeDetails();
  }

  showDocumentTypeDetails(){
    let documentTypeId = localStorage.getItem("documentTypeId");
    if(!documentTypeId) {
      alert("Invalid action.")
      this.router.navigate(['document-type']);
      return;
    }

    this.personService.getDocumentType(+documentTypeId).subscribe((res: DocumentType[])=>{
      this.documentType = res;
      console.log(res);
    });

    this.documentTypeDetails = this.personService.getDocumentTypeField(+documentTypeId);
  }

  deleteDocumentTypeFields(id: number){
    this.personService.deleteDocumentTypeFields(id)
      .subscribe(
        data => {
          console.log(data);
          this.showDocumentTypeDetails();
        },
        error => console.log(error));
  }

}
