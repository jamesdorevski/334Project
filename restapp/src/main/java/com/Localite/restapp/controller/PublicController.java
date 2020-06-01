package com.Localite.restapp.controller;

import com.Localite.restapp.model.Account;
import com.Localite.restapp.model.FAQ;
import com.Localite.restapp.model.Review;
import com.Localite.restapp.model.Tour;
import com.Localite.restapp.repository.AccountRepository;
import com.Localite.restapp.repository.FAQRepository;
import com.Localite.restapp.repository.ReviewRepository;
import com.Localite.restapp.repository.TourRepository;
import com.mongodb.BasicDBObject;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Scanner;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/")
public class PublicController
{
    private boolean debug = true;
    @Autowired private FAQRepository faqRepository;
    @Autowired private AccountRepository accountRepository;
    @Autowired private TourRepository tourRepository;
    @Autowired private ReviewRepository reviewRepository;

    // =================== General ===================
    @GetMapping(value="user/{userID}")
    public String getPublicUserProfile(@PathVariable("userID") ObjectId userID)
    {
        JSONObject result = new JSONObject();
        try
        {
            Account user = accountRepository.findBy_id(userID);
            if(user.getType().equals("tourguide"))
            {
                // getting tours
                ArrayList<Tour> createdTours = tourRepository.findToursByTourguide(userID.toString());

                // for each tour update reviews
                for(int i=0; i<createdTours.size();i++)
                {
                    ArrayList<Review> tourReviews = reviewRepository.getByTourID(createdTours.get(i).get_id());

                    if(tourReviews.size() > 0)// update only if a review exist
                    {
                        createdTours.get(i).setReviews(tourReviews);
                        tourRepository.save(createdTours.get(i));
                    }
                }

                // calculating average tour ratings for tourguide if tour exists
                if(createdTours.size() > 0)
                {
                    user.calcRatings(createdTours);
                    accountRepository.save(user);
                }

                result.put("createdTours", createdTours);
            }
            else if(user.getType().equals("tourist"))
            {
                ArrayList<Review> tourReviews = reviewRepository.getReviewerID(userID.toString());
                result.put("tourReviews", tourReviews);
            }

            result.put("profile", user.getProfileUser());
            result.put("success", true);
        }
        catch (NullPointerException e)
        {
            if (debug) System.out.println(e);
            result.put("message", "Error loading user profile");
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
            ArrayList<FAQ> faqList = faqRepository.findAll();
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

    @GetMapping(value="/languages")
    public String[] getLanguages()
    {
        String[] lang = new String[] {"Afrikaans", "Albanian", "Arabic", "Armenian",
            "Basque", "Bengali", "Bulgarian",
            "Catalan", "Cambodian", "Chinese (Mandarin)", "Croatian", "Czech",
            "Danish", "Dutch",
            "English", "Estonian",
            "Fiji", "Finnish", "French",
            "Georgian", "German", "Greek", "Gujarati",
            "Hebrew", "Hindi", "Hungarian",
            "Icelandic", "Indonesian", "Irish", "Italian",
            "Japanese", "Javanese",
            "Korean",
            "Latin", "Latvian", "Lithuanian",
            "Macedonian", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Mongolian",
            "Nepali", "Norwegian",
            "Persian", "Polish", "Portuguese", "Punjabi",
            "Quechua",
            "Romanian", "Russian",
            "Samoan", "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish",
            "Tamil", "Tatar", "Telugu", "Thai", "Tibetan", "Tonga", "Turkish",
            "Ukrainian", "Urdu", "Uzbek",
            "Vietnamese",
            "Welsh",
            "Xhosa"};

        return lang;
    }

    @GetMapping("/tour/tags")
    public String[] getTags()
    {
        String[] tags = new String[] {"Wheelchair Accessible", "Kid-Friendly",
                "Night-tour", "Day-Trip", "Food",
                "Wine", "Hiking and Outdoors", "Museums", "Nature and WildLife", "Shopping"};
        return tags;
    }
}
