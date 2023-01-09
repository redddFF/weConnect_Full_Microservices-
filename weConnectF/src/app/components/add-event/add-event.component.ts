import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { EventServiceService } from 'src/app/Service/event-service.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {


  constructor( private keycloakService:AuthService,private httpClient: HttpClient,
    private formBuilder:FormBuilder,
    private routes:Router,private eventService:EventServiceService){ }
  
  formvalue!:FormGroup
  imageSrc!:any;

ngOnInit(): void {
this.getUser()


      this.formvalue=this.formBuilder.group({
        event_name:['',Validators.required],
        description:['',Validators.required],
        date:['',Validators.required],
      
    })
    
  }


  currentUser:any


getUser(): void {
  this.currentUser=this.keycloakService.getLoggedUser()
  console.log(this.currentUser)
}
logOut(){
  this.keycloakService.logout()

}

event= {
  event_name:'',
  description:'',
  date :'',
  userId:'',
  userName:'',

};
  onSubmit(){


this.event.event_name = this.formvalue.value.event_name 
this.event.description= this.formvalue.value.description
this.event.date = this.formvalue.value.date 
this.event.userId=this.currentUser.sub
this.event.userName=this.currentUser.preferred_username
 
  
    this.eventService.addEvent(this.event).subscribe((data : any)=>{
        console.log(data);
        this.routes.navigate([`/`]);
    })
  }



}
