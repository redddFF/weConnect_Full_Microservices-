import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContentsService {
  apiUrl: string = 'http://localhost:8069/NODE-MICROSERVICE';
  constructor(private http:HttpClient) { }
  addContent(formData:any){
    return this.http.post(this.apiUrl+'/posts',formData);
  }

  listContent(){
    return this.http.get(this.apiUrl+'/posts/');
  }
  
  deleteContent(id:any){
    return this.http.delete(this.apiUrl+'/posts/'+id);
  }

  singleContent(id:any){
    return this.http.get(this.apiUrl+id);
  }

  updateContent(id:any,content:any){
    return this.http.patch(this.apiUrl+'/posts/'+id,content);
  }



}
