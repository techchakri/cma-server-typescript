import { Router } from "express";
import * as groupController from "../controllers/group.controller";
import validate from "../middlewares/validate.middleware";
import { groupValidatorSchema } from "../validators/group.validator";

const router:Router = Router()

/**
 * @usage  : Get all groups
 * @method : GET
 * @url    : http://localhost:9000/groups
 * @param  : No-params
 * @access : PUBLIC
 */

router.route("/").get(groupController.getAllGroups)

/**
 * @usage  : Get group
 * @method : GET
 * @url    : http://localhost:9000/groups/:groupId
 * @param  : No-params
 * @access : PUBLIC
 */

router.route("/:groupId").get(groupController.getGroup)

/**
 * @usage  : Create a group
 * @method : POST
 * @url    : http://localhost:9000/groups
 * @param  : name
 * @access : PUBLIC
 */

router.route("/").post(validate(groupValidatorSchema), groupController.createGroup)


export default router;