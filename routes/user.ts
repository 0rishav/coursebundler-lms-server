import express from "express"
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole } from "../controllers/user";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register",registrationUser)

userRouter.post("/activate-user",activateUser)

userRouter.post("/login",loginUser)

userRouter.get("/logout",isAuthenticated,logoutUser)


userRouter.get("/me",isAuthenticated,getUserInfo);

userRouter.post("/socialAuth",socialAuth);

userRouter.put("/updateuser",isAuthenticated,updateUserInfo)

userRouter.put("/updatepassword",isAuthenticated,updatePassword)

userRouter.put("/updateuseravatar",isAuthenticated,updateProfilePicture)

userRouter.get("/get-users",isAuthenticated,authorizedRoles("admin"),getAllUsers)

userRouter.put("/update-user",isAuthenticated,authorizedRoles("admin"),updateUserRole)

userRouter.delete("/delete-user/:id",isAuthenticated,authorizedRoles("admin"),deleteUser)


export default userRouter;