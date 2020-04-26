package com.Localite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;

import com.Localite.model.Account;
import com.Localite.model.Tourist;
import com.Localite.repository.AccountRepository;

@Controller
public class PublicController 
{

	@GetMapping("/")
	public String homePage(Model model)
	{
		return "home/home";
	}

	@GetMapping("/testpage")
	public String testpage(Model model)
	{
		return "testpage";
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
	
	@PostMapping("/findAccountByEmail")
	public String findAccountByEmail(String email, Model model)
	{
  //collate results
  String tableHeader = "<table>"; //<tr><th>FirstName</th><th>LastName</th><th>Email</th><th>Options</th></tr>
  String tableContents = "";
  String tableFooter = "</table>";
    for (Account tourist : repository.findByEmail(email)) {
      tableContents +=
                      "<tr>"
                          + "<td>"+tourist.getFirstName()+"<td>"
                          + "<td>"+tourist.getLastName()+"<td>"
                          + "<td>"+tourist.getEmail()+"<td>"
                          + "<td>"+tourist.get_id()+"<td>"
                          + "<td><a href='/deleteById?id="+tourist.get_id()+"'><button>Delete Account</button></a><td>"
                     +"<tr>"
                     ;
    }

    String message = tableHeader+tableContents+tableFooter;

		// load page
		model.addAttribute("title", "Search Results");
		model.addAttribute("message", message );
		model.addAttribute("redirect", true);
		model.addAttribute("redirectLink", "/");
		model.addAttribute("redirectText", "Home");
		return "message";
   }

	@PostMapping("/findAccountByFirstName")
	public String findAccountByFirstName(String firstName, Model model)
	{
  String script = "<script>"
                  +"function alertFunc(){"
                  +"alert('Josh hasnt done this yet');"
                  +"}"
                  +"</script>";
  //collate results
  String tableHeader = "<table>"; //<tr><th>FirstName</th><th>LastName</th><th>Email</th><th>Options</th></tr>
  String tableContents = "";
  String tableFooter = "</table>";
    for (Account tourist : repository.findByFirstName(firstName)) {
      tableContents +=
                      "<tr>"
                          + "<td>"+tourist.getFirstName()+"<td>"
                          + "<td>"+tourist.getLastName()+"<td>"
                          + "<td>"+tourist.getEmail()+"<td>"
                          + "<td>"+tourist.get_id()+"<td>"
                          + "<td><a href='/deleteById?id="+tourist.get_id()+"'><button>Delete Account</button></a><td>"
                     +"<tr>"
                     ;
    }

    String message = tableHeader+tableContents+tableFooter;

		// load page
		model.addAttribute("title", "Search Results");
		model.addAttribute("message", script + message );
		model.addAttribute("redirect", true);
		model.addAttribute("redirectLink", "/");
		model.addAttribute("redirectText", "Home");
		return "message";
   }

	@PostMapping("/createAccount")
	public String createAccount(@ModelAttribute Tourist tourist, Model model) 
	{
		// insert into mongo
		repository.insert(tourist);
		
		// load page
		model.addAttribute("title", "Sign Up Complete");
		model.addAttribute("message", "Please check your email for a verification link.");
		model.addAttribute("redirect", true);
		model.addAttribute("redirectLink", "/");
		model.addAttribute("redirectText", "Home");
		return "message";
   }
	
	// ------- pageTests -------

	@GetMapping("/deleteById")
	public String deleteById(String id, Model model) 
	{
	  ObjectId identifier = new ObjectId(id);
    String message = "";
      repository.deleteBy_id(identifier);

		// load page
		model.addAttribute("title", "Sign Up Complete");
		model.addAttribute("message", "account "+id+ "has been deleted");
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
