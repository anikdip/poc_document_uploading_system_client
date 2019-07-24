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

  createDocumentType(documentType: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/documentType`, documentType);
  }

  getDocumentTypeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/documentType`);
  }

  updateDocumentType(id: string, documentType: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/documentType/${id}`, documentType);
  }

  createDocumentTypeField(documentTypeField: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/documentTypeFields`, documentTypeField);
  }

  deleteDocumentType(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/documentType/${id}`, { responseType: 'text' });
  }

  getDocumentType(id: number) {
    return this.http.get(`${this.baseUrl}/documentType/${id}`);
  }

  getDocumentTypeFieldList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/documentTypeFields`);
  }

  getDocumentTypeField(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/documentTypeFieldsByDocumentType/${id}`);
  }

  deleteDocumentTypeFields(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/deleteDocumentTypeFields/${id}`, { responseType: 'text' });
  }

  createPersonDocumentInfo(pdi: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/personDocumentInfo`, pdi);
  }

  getPersonDocumentInfoByPersonId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/personDocumentInfo/${id}`);
  }
}
