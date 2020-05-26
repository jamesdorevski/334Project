package com.Localite.restapp.controller;

import com.Localite.restapp.model.Account;
import com.Localite.restapp.model.FAQ;
import com.Localite.restapp.model.Review;
import com.Localite.restapp.model.Tour;
import com.Localite.restapp.repository.AccountRepository;
import com.Localite.restapp.repository.FAQRepository;
import com.Localite.restapp.repository.TourRepository;
import com.mongodb.BasicDBObject;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/")
public class PublicController
{
    private boolean debug = true;
    @Autowired private FAQRepository faqRepository;
    @Autowired private AccountRepository accountRepository;
    @Autowired private TourRepository tourRepository;

    // =================== General ===================
    @GetMapping(value="user/{userID}")
    public String getPublicUserProfile(@PathVariable("userID") ObjectId userID)
    {
        JSONObject result = new JSONObject();
        try
        {
            BasicDBObject user = (accountRepository.findBy_id(userID)).getProfileUser();

            if(user.get("type").equals("tourguide"))
            {
                ArrayList<Tour> createdTours = tourRepository.findAllByTourGuide(userID); // getting tours by this tourGuide
                user.put("createdTours", createdTours);
            }
            result.put("user", user);
            result.put("success", true);
        }
        catch (NullPointerException e)
        {
            if (debug) System.out.println(e);
            result.put("message", "User profile does not exist");
            result.put("success", false);
        }
        catch (Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Unable to get user profile");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    @PostMapping(value="/{userID}/addReview/{revieweeID}")
    public String addUserReview(@PathVariable ObjectId userID, @PathVariable ObjectId revieweeID,
                                @RequestBody Review newReview) throws Exception
    {
        JSONObject result = new JSONObject();
        try
        {
            // obtaining reviewer details
            BasicDBObject reviewer = (accountRepository.findBy_id(userID).getBasicUser());
            newReview.set_id((new ObjectId()).toString());
            newReview.setReviewer(reviewer);
            newReview.setDateCreated(System.currentTimeMillis());

            // adding review to user's profile
            Account reviewee = accountRepository.findBy_id(revieweeID);
            reviewee.addReview(newReview);
            accountRepository.save(reviewee);
            result.put("success", true);
        }
        catch (NullPointerException e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Unable to find user reviewed");
            result.put("success", false);
        }
        catch (Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Review creation unsuccessful");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    // =================== FAQ ===================
    @PostMapping(value="faq/addOne")
    public String addOneQuestion(@RequestBody FAQ question)
    {
        JSONObject result = new JSONObject();
        try
        {
            faqRepository.insert(question);
            result.put("success", true);
        }
        catch (Exception e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Question upload failed");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    @PostMapping(value="faq/addMultiple")
    public String addMultipleQuestions(@RequestBody ArrayList<FAQ> questions)
    {
        JSONObject result = new JSONObject();
        try
        {
            for (int i=0; i<questions.size(); i++)
            {
                faqRepository.insert(questions.get(i));
            }
            result.put("success", true);
        }
        catch (Exception e)
        {
            result.put("message", "Question upload failed");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    @GetMapping(value="faq")
    public String getFAQ()
    {
        JSONObject result = new JSONObject();
        try
        {
            ArrayList<FAQ> rawFaq = faqRepository.findAll();
            System.out.println(rawFaq);
            ArrayList<JSONObject> faqList = new ArrayList<>();

            // formating for front end {"question":"answer"}
            for (int i=0; i<rawFaq.size(); i++)
            {
                JSONObject obj = new JSONObject();
                obj.put(rawFaq.get(i).getQuestion(), rawFaq.get(i).getAnswer());
                faqList.add(obj);
            }
            result.put("faqList", faqList);
            result.put("success", true);
        }
        catch (Exception e)
        {
            result.put("message", "Unable to retrieve faq questions");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }

    @DeleteMapping(value="faq/delete/{faqID}")
    public String deleteQuestion(@PathVariable ObjectId faqID)
    {
        JSONObject result = new JSONObject();
        try
        {
            faqRepository.deleteBy_id(faqID);
            result.put("success", true);
        }
        catch (Exception e)
        {
            result.put("message", "FAQ deletion failed");
            result.put("success", false);
        }
        finally
        {
            return result.toString();
        }
    }
}
