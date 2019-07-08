import { Component, OnInit } from '@angular/core';
import {PersonService} from "../person.service";
import {Router} from "@angular/router";
import {PersonInfo} from "../personInfo";
import {Observable} from "rxjs";
import {Person} from "../person";

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  perosnInfo: PersonInfo[] = [];

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    this.showPersonDetails()
  }

  showPersonDetails(){
    let personId = localStorage.getItem("personId");
    if(!personId) {
      alert("Invalid action.")
      this.router.navigate(['person-list']);
      return;
    }

    this.personService.getPersonDetails(+personId).subscribe((res: PersonInfo[])=>{
      this.perosnInfo = res;
      console.log(res);
    });

    // this.perosnInfo = this.personService.getPersonDetails(+personId)
    //   .subscribe(data => console.log(data), error => console.log(error));this.personService.getPersonDetails(+personId);
    // console.log(this.perosnInfo);
  }

}
