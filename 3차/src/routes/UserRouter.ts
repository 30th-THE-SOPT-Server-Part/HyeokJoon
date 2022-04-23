import { Router } from "express";
import { UserController } from "../controllers";

const router: Router = Router();

// routes => use (/user) => post
router.post("/", UserController.createUser);
router.put("/:userId", UserController.updateUser);
router.get("/:userId", UserController.findUserById);
router.delete("/:userId", UserController.deleteUserById);

export default router;
