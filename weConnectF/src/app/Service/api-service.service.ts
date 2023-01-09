import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiUrl: string = 'http://localhost:8011/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json');  
  constructor(private httpClient:HttpClient) { }
  
  listUsers(): Observable<any>{
    return this.httpClient.get('http://localhost:8069/users') ;  
  }
  getUser (id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get(url);
    
    }
  
  detailUser(id : any): Observable<any>{
    return this.httpClient.get(`http://localhost:8011/users/${id}`) ;  
  }

  
  filterByName(name: any): Observable<any> {
    return this.httpClient.get(`http://localhost:8011/users/search/${name}` ) ;
   
  }
  createUser(data: any): Observable<any> {
    return this.httpClient.post("http://localhost:8011/users", data)
  
  }

  
  updateUser(id: any, data: any): Observable<any> {
    return this.httpClient.put(`http://localhost:8011/users/${id}`, JSON.stringify(data))
  
  }
  deleteUser(id: any): Observable<any> {
    return this.httpClient.delete(`http://localhost:8011/users/${id}`)
  
  }
  
}
