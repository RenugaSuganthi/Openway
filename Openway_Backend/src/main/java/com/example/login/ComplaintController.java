package com.example.login;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    private final ComplaintService service;

    public ComplaintController(
            ComplaintService service) {

        this.service = service;
    }

    @PostMapping
    public Complaint addComplaint(
            @RequestBody Complaint complaint) {

        return service.saveComplaint(complaint);
    }
}