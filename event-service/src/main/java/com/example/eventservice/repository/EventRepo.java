package com.example.eventservice.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.eventservice.model.Event;



public interface EventRepo extends MongoRepository<Event, String> {
    
}
