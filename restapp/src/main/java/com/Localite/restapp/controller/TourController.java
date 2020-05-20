package com.Localite.restapp.controller;

import com.Localite.restapp.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value = "/tour")
public class TourController
{
    @Autowired private Account sessionUser;
}
