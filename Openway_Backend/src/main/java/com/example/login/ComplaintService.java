package com.example.login;

import org.springframework.stereotype.Service;

@Service
public class ComplaintService {

    private final ComplaintRepository repository;

    public ComplaintService(
            ComplaintRepository repository) {

        this.repository = repository;
    }

    public Complaint saveComplaint(
            Complaint complaint) {

        return repository.save(complaint);
    }
}