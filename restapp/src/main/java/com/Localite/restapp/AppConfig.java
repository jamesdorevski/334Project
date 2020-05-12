package com.Localite.restapp;

import com.Localite.restapp.model.Account;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.HttpServletRequest;

@Configuration
public class AppConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
//
//    @Bean
//    @Scope(WebApplicationContext.SCOPE_SESSION)
//    public Account visitor(HttpServletRequest request){
//        return new Account(request.getRemoteAddr());
//    }
}
