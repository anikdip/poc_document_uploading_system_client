import {Component, ElementRef, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Person} from "../person";
import {PersonService} from "../person.service";
import {Nid} from "../nid";
import {DrivingLicense} from "../driving-license";
import {TradeLicense} from "../trade-license";
import {Router} from "@angular/router";
import {DocumentType} from "../document-type";
import {DocumentTypeFields} from "../document-type-fields";
import {PersonInfo} from "../personInfo";
import {PersonDocumentInfo} from "../PersonDocumentInfo";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  perosn: Observable<Person[]>;

  documentType: Observable<DocumentType[]>;

  documentTypeFields: Observable<DocumentTypeFields[]>;

  dtFields: DocumentTypeFields[] = [];

  selectFile: File = null;

  personDocumentInfo: PersonDocumentInfo = new PersonDocumentInfo();

  nid: Nid = new Nid();
  submitted_nid = false;
  selectNidFile: File = null;

  drivingLicense: DrivingLicense = new DrivingLicense();
  submitted_drivingLicense = false;
  selectDLFile: File = null;

  tradeLicense: TradeLicense = new TradeLicense();
  submitted_tradeLicense = false;
  selectTLFile:File = null;

  constructor(private personService: PersonService, private router: Router) {
    console.log(personService);
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.perosn = this.personService.getPersonList();
    this.documentType = this.personService.getDocumentTypeList();
    this.documentTypeFields = this.personService.getDocumentTypeFieldList();
  }

  deletePerson(id: number) {
    this.personService.deletePerson(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  editPerson(person: Person): void {
    localStorage.setItem('personId', person.id.toString());
    this.router.navigate(['editPerson']);
  }

  detailsPerson(id: number): void {
    localStorage.setItem('personId', id.toString());
    this.router.navigate(['detailsPerson']);
  }

  onFileSelect(event, type){
    if(type=="file"){
      this.selectFile = <File>event.target.files[0];
      console.log(event);
    }
  }

  onTinFileSelect(event){
    this.selectNidFile = <File>event.target.files[0];
    console.log(this.selectNidFile);
  }

  newNid(): void {
    this.submitted_nid = false;
    this.nid = new Nid();
  }

  saveNid() {
    const uploadData = new FormData();
    uploadData.append("fileinfo", this.selectNidFile, this.selectNidFile.name);
    uploadData.append("person_id", this.nid.person_id.toString());
    uploadData.append("type", "nid");
    this.personService.uploadFile(uploadData)
      .subscribe(data => console.log(data), error => console.log(error));

    this.personService.createNid(this.nid)
      .subscribe(data => console.log(data), error => console.log(error));
    this.nid = new Nid();
  }

  onSubmit(form: NgForm, person_id) {
    var form_value = form.value;
    for (let fk in form_value){
      if(form.value[fk]!="") {
        var dtfId = fk.split("_");
        this.personDocumentInfo.document_type_field_id = parseInt(dtfId[dtfId.length-1]);
        this.personDocumentInfo.person_id = parseInt(person_id);

        if(dtfId[dtfId.length-2]=="file"){
          const uploadData = new FormData();
          uploadData.append("fileinfo", this.selectNidFile, this.selectNidFile.name);
          uploadData.append("person_id", this.nid.person_id.toString());
          uploadData.append("type", dtfId[dtfId.length-1]);
          this.personService.uploadFile(uploadData)
            .subscribe(data => console.log(data), error => console.log(error));
          this.personDocumentInfo.value = dtfId[dtfId.length-1]+"_"+person_id;
        }
        else{
          this.personDocumentInfo.value = form.value[fk];
        }

        this.personService.createPersonDocumentInfo(this.personDocumentInfo)
          .subscribe(data => console.log(data), error => console.log(error));
        this.personDocumentInfo = new PersonDocumentInfo();
      }
    }
    console.log(form.value);
    this.reloadData();
    (document.querySelector('.modal-backdrop') as HTMLElement).remove();
  }

  onSubmitNid(nid_person_id) {
    this.nid.nid_document_img = "nid_"+nid_person_id;
    this.nid.person_id = nid_person_id;
    this.submitted_nid = true;
    this.saveNid();
    this.reloadData();
    (document.querySelector('.modal-backdrop') as HTMLElement).remove();
  }

  onDLFileSelect(event){
    this.selectDLFile = <File>event.target.files[0];
    console.log(this.selectDLFile);
  }

  newDrivingLicense(): void {
    this.submitted_drivingLicense = false;
    this.drivingLicense = new DrivingLicense();
  }

  saveDrivingLicense() {
    const uploadData = new FormData();
    uploadData.append("fileinfo", this.selectDLFile, this.selectDLFile.name);
    uploadData.append("person_id", this.drivingLicense.person_id.toString());
    uploadData.append("type", "dl");
    this.personService.uploadFile(uploadData)
      .subscribe(data => console.log(data), error => console.log(error));

    this.personService.createDrivingLicense(this.drivingLicense)
      .subscribe(data => console.log(data), error => console.log(error));
    this.drivingLicense = new DrivingLicense();
  }

  onSubmitDrivingLicense(dl_person_id) {
    this.drivingLicense.driving_license_document_img = "dl_"+dl_person_id;
    this.drivingLicense.person_id = dl_person_id;
    this.submitted_drivingLicense = true;
    this.saveDrivingLicense();
    this.reloadData();
    (document.querySelector('.modal-backdrop') as HTMLElement).remove();
  }

  onTLFileSelect(event){
    this.selectTLFile = <File>event.target.files[0];
    console.log(this.selectTLFile);
  }

  newTradeLicense(): void {
    this.submitted_tradeLicense = false;
    this.tradeLicense = new TradeLicense();
  }

  saveTradeLicense() {
    const uploadData = new FormData();
    uploadData.append("fileinfo", this.selectTLFile, this.selectTLFile.name);
    uploadData.append("person_id", this.tradeLicense.person_id.toString());
    uploadData.append("type", "tl");
    this.personService.uploadFile(uploadData)
      .subscribe(data => console.log(data), error => console.log(error));

    this.personService.createTradeLicense(this.tradeLicense)
      .subscribe(data => console.log(data), error => console.log(error));
    this.tradeLicense = new TradeLicense();
  }

  onSubmitTradeLicense(tl_person_id) {
    this.tradeLicense.trade_license_document_img = "tl_"+tl_person_id;
    this.tradeLicense.person_id = tl_person_id;
    this.submitted_tradeLicense = true;
    this.saveTradeLicense();
    this.reloadData();
    (document.querySelector('.modal-backdrop') as HTMLElement).remove();
  }

  openDocumentModel(id){
    this.personService.getDocumentTypeFieldList().subscribe((res: DocumentTypeFields[])=>{
      for(let dtf of res){
        // !(document.querySelector('.show'+dtf.id) as HTMLElement).hidden;
        // (document.getElementsByClassName('.show'+dtf.id) as HTMLElement).hidden = true;
        (document.querySelector('.hide'+dtf.id) as HTMLElement).hidden = true;
      }
    });
  }

}
