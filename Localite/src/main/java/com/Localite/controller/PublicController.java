package com.Localite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.Localite.model.Account;
import com.Localite.repository.AccountRepository;

@Controller
public class PublicController 
{
	@GetMapping("/")
	public String homePage(Model model)
	{
		model.addAttribute("loggedIn", true);
		return "common/home";
	}
	
	@GetMapping("/register")
	public String register()
	{
		return "account/register";
	}
	
	@Autowired
	private AccountRepository repository;
	
	@PostMapping("/createAccount")
	public String createAccount(@ModelAttribute Account account, Model model) 
	{
		// insert into mongo
		repository.insert(account);
		
		// load page
		model.addAttribute("title", "Sign Up Complete");
		model.addAttribute("message", "Please check your email for a verification link.");
		model.addAttribute("redirect", true);
		model.addAttribute("redirectLink", "/");
		model.addAttribute("redirectText", "Home");
		return "message";
   }
	
	// pageTests
	@GetMapping("/message")
	public String messagePage(Model model)
	{
		model.addAttribute("title", "Sign Up Complete");
		model.addAttribute("message", "Please check your email for a verification link.");
		model.addAttribute("redirect", true);
		model.addAttribute("redirectLink", "/");
		model.addAttribute("redirectText", "Home");
		return "message";
	}
}
