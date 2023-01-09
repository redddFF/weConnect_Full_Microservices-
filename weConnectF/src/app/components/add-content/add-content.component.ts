import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { ContentsService } from 'src/app/Service/contents.service';



@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {
  constructor( private keycloakService:AuthService,private httpClient: HttpClient,private formBuilder:FormBuilder,private routes:Router,private contentservice:ContentsService){ }
  
  formvalue!:FormGroup
  imageSrc!:any;

ngOnInit(): void {
this.getUser()


      this.formvalue=this.formBuilder.group({
      description:['',Validators.required]})
    
  }
 
  content = {
    description:'',
    userId:'',
    userName:'',
    ImageName:'',
    fileType:''
  };
  currentUser:any
  uploadedFiles: Array<File> = [];

  uploadedFile:any
  fileChange(element:any) {
    this.uploadedFiles = element.target.files
    console.log(this.uploadedFiles)
}

getUser(): void {
  this.currentUser=this.keycloakService.getLoggedUser()
  console.log(this.currentUser)
}
logOut(){
  this.keycloakService.logout()

}


  onSubmit(){
    let formData = new FormData();
        for (var i = 0; i < this.uploadedFiles.length; i++) {
            formData.append("upload", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }

formData.append('description',this.formvalue.value.description )
formData.append('userName',this.currentUser.preferred_username)
formData.append('userId',this.currentUser.sub)
if(this.uploadedFiles[0]){
  formData.append('ImageName',"http://localhost:8011/"+this.uploadedFiles[0].name)
  formData.append('fileType',this.uploadedFiles[0].type.substring(0,5))
}

 
  
    this.contentservice.addContent(formData).subscribe((data : any)=>{
        console.log(data);
        this.routes.navigate([`/`]);
    })
  }

 

 


}
