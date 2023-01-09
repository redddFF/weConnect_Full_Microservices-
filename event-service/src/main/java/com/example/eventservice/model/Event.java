package com.example.eventservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//anotations
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Event")
public class Event {
   
    // Attributes
    @Id
    String _id ; 
    private String event_name;
    private String description;
    private String date;
    private String userId;
    private String userName;


    public String getEvent_name() {
        return this.event_name;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


}
