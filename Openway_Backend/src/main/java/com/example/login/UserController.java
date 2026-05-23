package com.example.login;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService service;

    public UserController(UserService service){
        this.service = service;
    }

    // SIGNUP
    @PostMapping("/signup")
    public User signup(@RequestBody User user){
        return service.saveUser(user);
    }

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody User user){

        User existingUser = service.loginUser(user.getUsername(), user.getPassword());

        if(existingUser != null){
            return "Login Successful";
        }else{
            return "Invalid Username or Password";
        }
    }

    // GET ALL USERS
    @GetMapping
    public List<User> getAllUsers(){
        return service.getAllUsers();
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id){
        return service.getUserById(id);
    }

    // DELETE USER
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id){
        service.deleteUser(id);
        return "Deleted Successfully";
    }
}
