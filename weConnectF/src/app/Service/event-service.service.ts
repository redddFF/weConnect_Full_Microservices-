import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  apiUrl: string = 'http://localhost:8069/EVENTS-SERVICE';

  constructor(private http:HttpClient) { }
  
  addEvent(formData:any){
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
  }); 
    return this.http.post(this.apiUrl+'/addEvent',JSON.stringify(formData) ,
    {
     headers:headers
  } );
  }

  getAllEvents(){
    return this.http.get(this.apiUrl);
  }
  
  deleteEvent(id:any){
    return this.http.delete(this.apiUrl+'/delete/'+id);
  }

  getEvent(id:any){
    return this.http.get(this.apiUrl+id);
  }

 
 
}
