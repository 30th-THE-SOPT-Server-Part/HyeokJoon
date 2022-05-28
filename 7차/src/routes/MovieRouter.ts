import { Router } from "express";
import { body } from "express-validator/check";
import { MovieController } from "../controllers";
import auth from "../middleware/auth";

const router: Router = Router();

router.post(
    "/",
    [body("title").notEmpty(), body("director").notEmpty()],
    MovieController.createMovie
);
router.put("/:movieId", MovieController.updateMovie);
router.get("/:movieId", MovieController.findMovie);
router.delete("/:movieId", MovieController.deleteMovie);
router.post(
    "/:movieId/comment",
    [body("writer").notEmpty(), body("comment").notEmpty()],
    MovieController.createMovieComment
);
router.put(
    "/:movieId/comments/:commentId",
    [body("comment").notEmpty()],
    auth,
    MovieController.updateMovieComment
);

export default router;
