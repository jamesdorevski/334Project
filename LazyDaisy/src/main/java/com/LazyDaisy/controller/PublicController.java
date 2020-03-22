package com.LazyDaisy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.LazyDaisy.model.Account;

@Controller
public class PublicController 
{
	@GetMapping("/register")
	public String register()
	{
		return "account/register";
	}
	
	@PostMapping("/createAccount")
	public String createAccount(@ModelAttribute Account account, Model model) 
	{
		model.addAttribute("title", "Sign Up Complete");
		model.addAttribute("message", "Please check your email for a verification link.");
		model.addAttribute("redirectLink", false);
		return "message";
   }
}
