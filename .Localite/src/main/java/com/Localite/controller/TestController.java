package com.Localite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("test")
public class TestController 
{

	@GetMapping("/simple")
	public String loadTestPage()
	{
		return "samples/simple-test";
	}
	
	@GetMapping("/generic")
	public String loadGenericPage()
	{
		return "samples/generic-page";
	}
}
