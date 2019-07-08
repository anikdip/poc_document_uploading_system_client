import { Component, OnInit } from '@angular/core';
import {PersonService} from "../person.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Person} from "../person";
import {Router} from "@angular/router";

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class
PersonEditComponent implements OnInit {

  person: Person = new Person();
  editForm: FormGroup;
  submitted = false;

  constructor(private personService: PersonService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    let personId = localStorage.getItem("personId");
    if(!personId) {
      alert("Invalid action.")
      this.router.navigate(['person-list']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fathername: ['', Validators.required],
      mothername: ['', Validators.required],
      birthdate: ['', Validators.required],
      emailId: ['', Validators.required],
      mobileno: ['', Validators.required]
    });
    this.personService.getPerson(+personId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  update() {
    let personId = localStorage.getItem("personId");
    this.personService.updatePerson(personId, this.person)
      .subscribe(data => console.log(data), error => console.log(error));
    this.person = new Person();
  }

  onSubmit(){
    this.submitted = true;
    this.update();
  }

}
