import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private baseUrl = '/api/v1/person';

  constructor(private http: HttpClient) { }

  getPerson(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getPersonDetails(id: number) {
    return this.http.get(`${this.baseUrl}/personDetails/${id}`);
  }

  createPerson(person: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, person);
  }

  updatePerson(id: string, person: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, person);
  }

  deletePerson(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getPersonList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createNid(nid: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/nid`, nid);
  }

  createDrivingLicense(drivingLicense: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/drivingLicense`, drivingLicense);
  }

  createTradeLicense(tradeLicense: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/tradeLicense`, tradeLicense);
  }

  uploadFile(fileInfo): Observable<Object> {
    return this.http.post(`${this.baseUrl}/upload`, fileInfo);
  }
}
