package com.Localite.restapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;
import java.util.ArrayList;
import org.bson.types.ObjectId;
import java.util.Random;
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

    @PostMapping(path="update/{userID}")
    public String updateUser(@PathVariable("userID") ObjectId userID,
                             @RequestBody Account newInfo) throws Exception
    {
        JSONObject result = new JSONObject();

        try
        {
            Account thisAccount = accountRepository.findBy_id(userID);
            thisAccount.update(newInfo);
            accountRepository.save(thisAccount);
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

    @DeleteMapping(path="delete/{userID}")
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

    @GetMapping(path="/tourist/{userID}")
    public String getUserProfile(@PathVariable ObjectId userID) throws Exception
    {
        JSONObject result = new JSONObject();

        try
        {
             /*
             * tourist
             * - get current bookings
             * - get past bookings
             */

            /*
             * tourguide
             * - get current bookings
             * - get past bookings
             */
        }
        catch(Exception e)
        {

        }
        finally
        {
            return result.toString();
        }
    }

    @PostMapping("/generate")
    public String generateUser(@RequestBody int amountToGenerate) throws Exception
    {
        JSONObject result = new JSONObject();
        Random rand = new Random();
        for(int i = 0; i < amountToGenerate ; i++)
        {
            try
            {
                ObjectId _id = new ObjectId();
                System.out.println("Creating Account " + i + " of " + amountToGenerate);
                int randomizedInt = rand.nextInt(100000);

                //email is obviously fake and made unique by adding a generated int. (may be duplicate occasionally)
                String email = ("fakemail" + String.valueOf(randomizedInt) + "@fake.com");
                System.out.println(email);

                //for sake of convenience password is always the same
                String hashbrown = "password123";

                //phonenumber is 44 then randomized
                String phoneNumber = ("44"+ String.valueOf(randomizedInt));

                //50/50 chance items decided by modulo (%) 2 and ternary operator to assign
                String type = (randomizedInt % 2 == 0) ? "tourist" : "tourguide";
                String gender = (randomizedInt % 2 == 0) ? "Male" : "Female"; //more gender options exist but this way is easier for right now
                String firstName = (gender == "male") ? "Bob" : "Alice";

                //these and names can be made unique by picking randomly from an array. For now they're set
                ArrayList<String> languagesSpoken = new ArrayList<>();
                languagesSpoken.add("English"); //more later

                String lastName = "Testo";
                String img = "https://vippuppies.com/wp-content/uploads/2019/06/deberly-IMG_3786.jpg";

                //now we create the account
                Account newAccount = new Account(type, firstName, lastName, email, hashbrown, phoneNumber, languagesSpoken, gender, img);
                newAccount.set_id(_id);
                createUser(newAccount);

                  System.out.println("Account " + i + " generated with id:" + _id);
                if (debug)
                  System.out.println("Account " + i + " generated with id:" + _id);
                result.put("message", "Account generated");
                result.put("success", true);
            }
            catch (Exception e)
            {
                if (debug)
                  System.out.println(e);
                result.put("message", "Account generation unsuccessful");
                result.put("success", false);
            }
            finally
            {
              continue;
            }
      }
      return result.toString();
    }
}

