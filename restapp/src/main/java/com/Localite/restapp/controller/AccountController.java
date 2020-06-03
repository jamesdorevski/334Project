package com.Localite.restapp.controller;

import com.Localite.restapp.model.Booking;
import com.Localite.restapp.model.Tour;
import com.Localite.restapp.repository.BookingRepository;
import com.Localite.restapp.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

import java.io.InputStream;
import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;
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
    @Autowired private BookingRepository bookingRepository;
    @Autowired private TourRepository tourRepository;

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

    @GetMapping(path="/profile/{userID}")
    public String getUserProfile(@PathVariable ObjectId userID) throws Exception
    {
        JSONObject result = new JSONObject();

        try
        {
            Account user = accountRepository.findBy_id(userID);
            Long dateToday = System.currentTimeMillis();

            if(user.getType().equals("tourguide"))
            {
                ArrayList<Tour> currentTours = new ArrayList<Tour>();
                ArrayList<Tour> pastTours = new ArrayList<Tour>();

                ArrayList<Tour> allTours = tourRepository.findToursByTourguide(userID.toString());

                for(int i=-0; i<allTours.size(); i++)
                {
                    if (allTours.get(i).getEndTour() > dateToday) // current
                        currentTours.add(allTours.get(i));
                    else
                        pastTours.add(allTours.get(i));
                }

                result.put("currentTours", currentTours);
                result.put("pastTours", pastTours);
            }
            else if (user.getType().equals("tourist"))
            {
                ArrayList<Booking> currentBookings = new ArrayList<Booking>();
                ArrayList<Booking> pastBookings = new ArrayList<Booking>();

                ArrayList<Booking> allBookings = bookingRepository.getTouristBookings(userID.toString());

                for(int i=-0; i<allBookings.size(); i++)
                {
                    if (allBookings.get(i).getDateBooked() > dateToday) // current
                        currentBookings.add(allBookings.get(i));
                    else
                        pastBookings.add(allBookings.get(i));
                }

                result.put("currentBookings", currentBookings);
                result.put("pastBookings", pastBookings);
            }

            result.put("success", true);
        }
        catch(Exception e)
        {
            result.put("success", false);
            result.put("message", "Error retrieving user profile");
        }
        finally
        {
            return result.toString();
        }
    }

    @GetMapping("/generateAccounts")
    public String generateUser() throws Exception
    {
        int amountToGenerate = 100;
        JSONObject result = new JSONObject();
        Random rand = new Random();
        System.out.println("hi");
        for(int i = 0; i < amountToGenerate ; i++)
        {
            try
            {
                // female names
                String [] female = new String[0];
                Resource resource = new ClassPathResource("female.txt");
                InputStream inputStream = resource.getInputStream();
                byte[] bdata = FileCopyUtils.copyToByteArray(inputStream);
                String data = new String(bdata, StandardCharsets.UTF_8);
                female = data.split("\r\n");

                String [] male = new String[0];
                Resource resource2 = new ClassPathResource("male.txt");
                InputStream inputStream2 = resource2.getInputStream();
                byte[] bdata2 = FileCopyUtils.copyToByteArray(inputStream2);
                String data2 = new String(bdata2, StandardCharsets.UTF_8);
                male = data2.split("\r\n");

                ObjectId _id = new ObjectId();
                System.out.println("Creating Account " + i + " of " + amountToGenerate);
                int randomizedInt = rand.nextInt(100000);
                int rand2 = rand.nextInt(99);

                //for sake of convenience password is always the same
                String hashbrown = "$2a$10$E.ZsP2lAaMsf728G6D2NSu66B7MRLWKWsIyHkJkwP/ZNkoLxt92Qa";

                //phonenumber is 44 then randomized
                String phoneNumber = ("44"+ String.valueOf(randomizedInt));

                //50/50 chance items decided by modulo (%) 2 and ternary operator to assign
                String type;
                if (i < 10) type = "tourguide";
                else type = "tourist";

                //String type = (randomizedInt % 2 == 0) ? "tourist" : "tourguide";
                String gender = (randomizedInt % 2 == 0) ? "Male" : "Female"; //more gender options exist but this way is easier for right now

                // get name
                String[] fullname = new String[0];
                if(gender.equals("Male"))
                    fullname = male[rand2].split(" ");
                else if(gender.equals("Female"))
                    fullname = female[rand2].split(" ");

                String firstName = fullname[0];
                String lastName = fullname[1];

                //email is obviously fake and made unique by adding a generated int. (may be duplicate occasionally)
                String email = (fullname[0].substring(0, 5) + String.valueOf(randomizedInt) + "@gmail.com");
                System.out.println(email);

                //these and names can be made unique by picking randomly from an array. For now they're set
                ArrayList<String> languagesSpoken = new ArrayList<>();
                languagesSpoken.add("English"); //more later

                String img = "https://vippuppies.com/wp-content/uploads/2019/06/deberly-IMG_3786.jpg";

                //now we create the account
                String bio = "";
                Account newAccount = new Account(type, firstName, lastName, email, hashbrown, bio, phoneNumber, languagesSpoken, gender, img);
                System.out.println(newAccount);
                accountRepository.insert(newAccount);

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

