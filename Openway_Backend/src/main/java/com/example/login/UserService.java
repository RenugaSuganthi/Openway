package com.example.login;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository){
        this.repository = repository;
    }

    public User saveUser(User user){
        return repository.save(user);
    }

    public List<User> getAllUsers(){
        return repository.findAll();
    }

    public User getUserById(Long id){
        return repository.findById(id).orElse(null);
    }

    public void deleteUser(Long id){
        repository.deleteById(id);
    }

    // LOGIN CHECK
    public User loginUser(String username, String password){
        return repository.findByUsernameAndPassword(username, password);
    }
}