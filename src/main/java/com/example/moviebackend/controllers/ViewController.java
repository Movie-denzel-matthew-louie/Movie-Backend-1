package com.example.moviebackend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

//    @RequestMapping({"/", "/about", "/login", "/home", "/posts", "/register", "/me"})
@RequestMapping({"/","/movies"," ","/searchMovies", "/about"})
    public String showView() {
        return "forward:/index.html";
    }
}