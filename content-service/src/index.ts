const express = require('express')
import {Request,Response } from "express";
import User from "./user" ; 
import bodyParser from "body-parser" ; 

import cors from "cors" ; 
import mongoose from "mongoose";
import Post from "./Post";
const fs = require("fs");
const app = express();  
app.use(bodyParser.json()) ; 



  


app.use(bodyParser.urlencoded({
    extended: true
}));


const Keycloak = require('keycloak-connect') ;
const session = require('express-session');
const memoryStore = new session.MemoryStore()

 app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}))

const keycloak = new Keycloak({
    store: memoryStore
  })
  app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/',
    protected: '/protected/resource'
  }))
 


  

const  multipart  =  require('connect-multiparty');
  
const  multipartMiddleware  =  multipart({ 
         uploadDir:  './public' 
});






const uri:string="mongodb://localhost:27017/weConnect" ; 

mongoose.connect(uri,(err)=>{
    if(err){
        console.log(err); 
    }
    else{
        console.log("Mongo db connection success") ; 
    }
})





 // ------------------ Eureka Config --------------------------------------------

const Eureka = require('eureka-js-client').Eureka;

const eureka = new Eureka({
    instance: {
        app: 'node-microservice',
        instanceId: 'node-microservice',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port:  {
            '$': 8011,
            '@enabled': 'true',
        },
        vipAddress: 'node-microservice',
        statusPageUrl: 'http://localhost:8011/',
        dataCenterInfo:  {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true,
        fetchRegistry: true
    },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  }
});
eureka.logger.level('debug');
eureka.start((error:any)=>{
  console.log(error || 'complete');
});

// ------------------ Server Config --------------------------------------------

app.get("/",(req:any,resp:Response)=>{
     resp.send("hello world")
}) ; 

app.get("/posts",(req:Request,resp:Response)=>{
    Post.find((err,users)=>{
        if(err){
            resp.status(500).send(err);
        }
        else{
            resp.send(users) ; 
        }
    }) ; 
}) ;

app.post("/posts",multipartMiddleware,(req:Request,resp:Response)=>{  

    let post = new Post({
        title : req.body.title,
        description : req.body.description,
        userName:  req.body.userName,
        userId:  req.body.userId, 
        ImageName:req.body.ImageName,
        fileType:req.body.fileType
        
    });
    post.save(err=>{
        if(err) resp.status(500).send(err); 
        else {resp.send(post)
          
        } ; 
    });

});

app.patch("/:postId",(req:Request,resp:Response)=> {
    try {
        const updatePost =Post.updateOne(
            { _id : req.params.postId},
            {$set : {
                title : req.body.title,
                description : req.body.description,
            }}
        );
        resp.json(updatePost);

    } catch (err) {
        resp.json({ message : err});
        //res.json("post not found to updated");
    }
});


app.get("/posts/:id",(req:Request,resp:Response)=>{
    Post.findOne({
           '_id': req.params.id
       },(err:any,posts:any)=>{
           if(err){
               resp.status(500).send(err);
           }
           else{
               resp.send(posts) ; 
           }
       }) 
   }) ; 



   app.delete("/posts/:postId",async (req:Request,res:Response)=>{
    try {
        const removePost = await Post.deleteOne({ _id : req.params.postId});
        res.json(removePost);
        //res.json("Post succefully deleted");
    } catch (err) {
        res.json({ message : err});
        //res.json("post not found to deleted");
    }
});



app.use(express.static('public'));

app.listen(8011,()=>{
    console.log("Server Started on port 8011")
})