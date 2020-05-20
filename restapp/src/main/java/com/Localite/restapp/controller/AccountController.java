package com.Localite.restapp.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.Localite.restapp.model.Account;
import com.Localite.restapp.repository.AccountRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/account")
public class AccountController
{
    private boolean debug = false;
    @Autowired private PasswordEncoder bcrypt;
    @Autowired private AccountRepository accountRepository;
    @Autowired private Account sessionUser;

    @PostMapping("/create")
    public String createUser(@RequestBody Account newAccount) throws Exception
    {
        JSONObject result = new JSONObject();
        try
        {
            newAccount.setHashbrown(bcrypt.encode(newAccount.getHashbrown())); // hashing password
            accountRepository.insert(newAccount); // storing in database
            if (debug) System.out.println("Account created");

            result.put("message", "Account created");
            result.put("success", true);
        }
        catch (DataIntegrityViolationException e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Email already exist!");
            result.put("success", false);
        }
        catch (Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Account creation unsuccessful");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    @PostMapping(path = "/login")
    public String loginUser(@RequestBody String input) throws Exception
    {
        JSONObject login = new JSONObject(input);
        JSONObject result = new JSONObject();
        try
        {
            Account user = accountRepository.findByEmail(login.getString("email")); // getting user from database

            if(user != null) // user exists
            {
                boolean authenticate = bcrypt.matches(login.getString("password"), user.getHashbrown()); //authenticate user login using database

                if (authenticate)
                {
                    if (debug) System.out.println("User has logged in");
                    sessionUser = user; // adding user to session??

                    result.put("user", user.toString());
                    result.put("success", true);
                }
                else
                {
                    if (debug) System.out.println("Incorrect email or password");
                    result.put("message", "Incorrect email or password");
                    result.put("success", false);
                }
            }
            else
            {
                if (debug) System.out.println("User does not exist");
                result.put("message", "User does not exist");
                result.put("success", false);
            }
        }
        catch(Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Network Error");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    @PostMapping(path="update/{id}")
    public String updateUser(@PathVariable("id") ObjectId userID, @RequestBody Account newInfo) throws Exception
    {
        JSONObject result = new JSONObject();
        try
        {
            newInfo.set_id(userID);
            accountRepository.save(newInfo);
            result.put("message", "Account updated");
            result.put("success", true);
        }
        catch (DataIntegrityViolationException e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Account update unsuccessful");
            result.put("success", false);
        }
        catch(Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Network Error");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    @PostMapping(path="delete/{userID}")
    public String deleteUser(@PathVariable ObjectId userID) throws Exception
    {
        JSONObject result = new JSONObject();
        try
        {
            accountRepository.deleteBy_id(userID);
            result.put("message", "Account deleted");
            result.put("success", true);
        }
        catch(Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Network Error");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }
}