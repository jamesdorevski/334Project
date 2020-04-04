package com.Localite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;

import com.Localite.model.Account;
import com.Localite.repository.AccountRepository;

@Controller
public class PublicController 
{
	@GetMapping("/")
	public String homePage(Model model)
	{
		return "home/home";
	}

	@PostMapping("/findTour")
	public String findTour(@RequestBody String name)
	{
		System.out.println(name);
		return "home/home";
	}
	
	
	// ------- Account Repository -------
	@Autowired
	private AccountRepository repository;

	@GetMapping("/register")
	public String register()
	{
		return "account/register";
	}
	
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
	
	// ------- pageTests -------
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
