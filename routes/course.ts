import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import {
  AddAnswer,
  addQuestion,
  addReplyReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAdminAllCourse,
  
  getAllCourses,
  getCoursebyUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  
  isAuthenticated,
  authorizedRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
 
  isAuthenticated,
  authorizedRoles("admin"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/all-course",getAllCourses)

courseRouter.get("/get-course-content/:id",isAuthenticated,getCoursebyUser);

courseRouter.put("/add-question",isAuthenticated,addQuestion)

courseRouter.put("/add-answer",isAuthenticated,AddAnswer)

courseRouter.put("/add-review/:id",isAuthenticated,addReview)

courseRouter.put("/add-reply",isAuthenticated,authorizedRoles("admin"),addReplyReview)

courseRouter.get("/get-Admin-courses",isAuthenticated,authorizedRoles("admin"),getAdminAllCourse)

courseRouter.post("/getVdoCipherOTP",generateVideoUrl);

courseRouter.delete("/delete-course/:id",isAuthenticated,authorizedRoles("admin"),deleteCourse)





export default courseRouter;
