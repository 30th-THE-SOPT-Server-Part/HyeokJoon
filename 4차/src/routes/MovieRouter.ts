import { Router } from "express";
import { body } from "express-validator/check";
import { MovieController } from "../controllers";

const router: Router = Router();

router.post(
    "/",
    [
        body("title").notEmpty(),
        body("director").notEmpty(),
        body("startDate").notEmpty().isDate(),
        body("thumbnail").notEmpty().isURL(),
        body("story").notEmpty(),
    ],
    MovieController.createMovie
);
router.put("/:movieId", MovieController.updateMovie);

export default router;
