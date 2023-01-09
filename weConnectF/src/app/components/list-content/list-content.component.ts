import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { ContentsService } from 'src/app/Service/contents.service';
import { EventServiceService } from 'src/app/Service/event-service.service';


@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})
export class ListContentComponent implements OnInit {
  contents: any;
  events:any
  currentUser: any;
  urlIMG:any
  constructor(private keycloakService:AuthService,private route: ActivatedRoute,private usersService: ApiServiceService,private eventsService:EventServiceService,private contentservice:ContentsService,private routes:Router){}
  ngOnInit(): void {
    this.loadContent();
    this.getUser();
    this.loadEvents() ; 
    console.log(this.events)
   
  }
  

  loadContent(){
    this.contentservice.listContent().subscribe((data:any)=>{
      console.log(data);
      this.contents=data;
    })
  }
  loadEvents(){
    this.eventsService.getAllEvents().subscribe((data:any)=>{
      console.log(data);
      this.events=data;
    })
  }

  delContent(datas:any){
    this.contentservice.deleteContent(datas._id).subscribe(data=>{
      console.log(data);
      this.contents=this.contents.filter((u:any)=>u!==datas)
    })
  }
  delEvent(datas:any){
    this.eventsService.deleteEvent(datas._id).subscribe(data=>{
      console.log(data);
      this.events=this.events.filter((u:any)=>u!==datas)
    })
  }
  getUser(): void {
    this.currentUser=this.keycloakService.getLoggedUser()
    console.log(this.currentUser)
  }
  logOut(){
    this.keycloakService.logout()
  
  }
 
      

}
