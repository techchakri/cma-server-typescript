import { Router } from "express";
import * as userController from "../controllers/user.controller";
import validate from "../middlewares/validate.middleware";
import { loginValidatorSchema, registerValidatorSchema } from "../validators/user.validator";
import { auth } from "../middlewares/auth.middleware";

const router: Router = Router();

/**
 * @usage : Register a User
 * @method : POST
 * @url : http://localhost:9000/users/register
 * @param : username, email, password
 * @access : PUBLIC
 */

router.route("/register").post(validate(registerValidatorSchema), userController.registerUser);

/**
 * @usage : Login a User
 * @method : POST
 * @url : http://localhost:9000/users/login
 * @param : email, password
 * @access : PUBLIC
 */

router.route("/login").post(validate(loginValidatorSchema), userController.loginUser);


/**
 * @usage : get User Info
 * @method : GET
 * @url : http://localhost:9000/users/me
 * @param : no-params
 * @access : PRIVATE
 */

router.route("/me").get(auth, userController.getUserInfo);

export default router;