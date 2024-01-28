import { Router } from "express";
import { userDetailsRegister,resumeDetails,resumeDetailsByName} from "../controllers/user.controller.js";

const router=Router()

router.route("/uploadResumeDetails").post(userDetailsRegister)
router.route("/getResumeById/:id").get(resumeDetails)
router.route("/getResumeByName/:name").get(resumeDetailsByName)

export default router;