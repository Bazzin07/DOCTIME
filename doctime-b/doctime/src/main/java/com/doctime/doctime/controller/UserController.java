package com.doctime.doctime.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/home")
    public String home() {
        return "home"; // This would be your main application page
    }
}

