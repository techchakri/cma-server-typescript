import {Router} from "express";
import * as contactController from "../controllers/contact.controller";
import validate from "../middlewares/validate.middleware";
import { contactValidatorSchema } from "../validators/contact.validator";
import { auth } from "../middlewares/auth.middleware";

const router:Router = Router();

/**
 * @usage  : Get all contacts
 * @method : GET
 * @url    : http://localhost:9000/contacts
 * @param  : No-params
 * @access : PRIVATE
 */

router.route("/").get(auth ,contactController.getAllContacts);

/**
 * @usage  : Get contact
 * @method : GET
 * @url    : http://localhost:9000/contacts/:contactId
 * @param  : No-params
 * @access : PRIVATE
 */

router.route("/:contactId").get(auth ,contactController.getContact);


/**
 * @usage  : Create a contact
 * @method : POST
 * @url    : http://localhost:9000/contacts
 * @param  : name, imageUrl, mobile, email, company, title, groupId
 * @access : PRIVATE
 */

router.route("/").post(auth ,validate(contactValidatorSchema), contactController.createContact)


/**
 * @usage  : Update a contact
 * @method : PUT
 * @url    : http://localhost:9000/contacts/:contactId
 * @param  : name, imageUrl, mobile, email, company, title, groupId
 * @access : PRIVATE
 */

router.route("/:contactId").put(auth ,validate(contactValidatorSchema), contactController.updateContact)

/**
 * @usage  : Delete a contact
 * @method : DELETE
 * @url    : http://localhost:9000/contacts/:contactId
 * @param  : No-params
 * @access : PRIVATE
 */

router.route("/:contactId").delete(auth ,contactController.deleteContact)

export default router;