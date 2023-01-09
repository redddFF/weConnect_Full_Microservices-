package com.example.eventservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.example.eventservice.model.Event;
import com.example.eventservice.repository.EventRepo;


import java.util.List;
import java.util.Optional;

// Annotation
@RestController

public class EventController {
   
    
    @Autowired
    private EventRepo repo;
  


    @PostMapping( value = "/addEvent" , consumes = { MediaType.APPLICATION_JSON_VALUE})
    public void saveEvent(
    @RequestBody Event event ){
        //storageService.save(file);

        Event ev = new Event(
                   event.get_id(),    
                   event.getEvent_name(),
                   event.getDescription(),
                   event.getDate(),
                   event.getUserId(),
                   event.getUserName());
            repo.save(ev);
    }

    @GetMapping("/")
    public List<Event> getEvents() {
        return repo.findAll();
    }
    

    @DeleteMapping("/delete/{id}")
    public void deleteEvent(@PathVariable String id){
repo.deleteById(id);

       
    }

    @GetMapping("/{id}")
    public Optional<Event> findEventById(@PathVariable String id){
       return  repo.findById(id) ;
       
        
    }
    
    

}
