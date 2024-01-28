import { Resume } from "../model/resume.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from "mongoose"

const userDetailsRegister=asyncHandler(async (req,res)=>{
    try {
        const { firstName,lastName, jobCompany,jobTitle, jobDescription } = req.body;
    
        // Validate input
        if (!firstName || !lastName || !jobCompany || !jobTitle || !jobDescription) {
          return res.status(400).json({ error: 'Bad Request. Missing required fields.' });
        }
    
        // Save to MongoDB
        const newResume = new Resume({
          firstName:firstName.toLowerCase(),
          lastName:lastName.toLowerCase(),
          jobCompany,
          jobTitle,
          jobDescription,
        });
    
        await newResume.save();
    
        return res.status(200).json({ resumeId: newResume._id });
      } catch (error) {
        // console.error(error);
        console.log('err',error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
})

const resumeDetails=asyncHandler(async (req,res)=>{
    try{
        const resume = await Resume.findById(req.params.id);
    
        if (!resume) {
          return res.status(400).json({ error: 'Resume not found.' });
        }
    
        return res.json(resume);
      } 
      catch (error) {
        // console.error(error);
        return res.status(400).json({ error: 'Internal Server Error' });
      }
})

const resumeDetailsByName=asyncHandler(async (req,res)=>{ 
  let name = decodeURIComponent(req.params.name)
  name=name.split(' ');
    console.log("name",name)
    if (name.length !== 2) {
        return res.status(400).send('Bad Request: Name should contain both first name and last name.');
    }

    const [firstName, lastName] = name;

    try {
        let resumes = await Resume.find({ firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase() });

        if (resumes.length === 0) {
            resumes = await Resume.find({
                $or: [
                    { firstName: firstName },
                    { lastName: lastName }
                ]
            });
        }

        if (resumes.length === 0) {
            return res.status(404).send('No resumes found.');
        }

        res.json(resumes);
    } catch (err) {
        res.status(500).send('Server error');
    }
})

export {userDetailsRegister,resumeDetails,resumeDetailsByName};