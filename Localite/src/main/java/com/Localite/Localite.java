package com.Localite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Localite 
{
    public static void main(String[] args) 
    {
        System.setProperty("spring.devtools.restart.enabled", "false");
        SpringApplication.run(Localite.class, args);
    }
}
