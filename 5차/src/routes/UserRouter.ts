import { Router } from "express";
import { UserController } from "../controllers";
import { body } from "express-validator/check";

const router: Router = Router();

router.post(
    "/",
    [
        body("name").notEmpty(),
        body("phone").notEmpty(),
        body("email").isEmail(), // email 형식
        body("password").isLength({ min: 6 }), // 최소 6자
    ],
    UserController.createUser
);
router.put("/:userId", UserController.updateUser);
router.get("/:userId", UserController.findUserById);
router.delete("/:userId", UserController.deleteUser);
router.post(
    "/signin",
    [
        body("email").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
        body("password").notEmpty(),
    ],
    UserController.signInUser
);

export default router;
