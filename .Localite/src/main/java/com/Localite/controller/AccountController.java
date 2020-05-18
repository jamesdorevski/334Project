package com.Localite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.Localite.repository.AccountRepository;

@Controller
@RequestMapping("/account")
public class AccountController 
{
	@Autowired
	private AccountRepository repository;
}