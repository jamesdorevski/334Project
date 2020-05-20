package com.Localite.restapp.controller;

import com.Localite.restapp.model.FAQ;
import com.Localite.restapp.repository.AccountRepository;
import com.Localite.restapp.repository.FAQRepository;
import com.Localite.restapp.repository.ReviewRepository;
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
    @Autowired private ReviewRepository reviewRepository;

    // =================== General ===================
    @GetMapping(value="user/{userID}")
    public String getUserProfile(@PathVariable("userID") ObjectId userID)
    {
        JSONObject result = new JSONObject();
        try
        {
            BasicDBObject user = (accountRepository.findBy_id(userID)).getSimpleUser();
            // TODO - calculating average (need to get Review done first)
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
