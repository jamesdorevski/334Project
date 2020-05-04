package com.in28minutes.rest.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//Controller
@RestController
//http://localhost:4200
@CrossOrigin(origins="http://localhost:4200")
public class BasicAuthenticationController {

    //hello-world-bean
    @GetMapping(path="/basicauth")
    public AuthenticationBean authenticationBean(){
        return new AuthenticationBean("You are Authenticated");
    }

}

