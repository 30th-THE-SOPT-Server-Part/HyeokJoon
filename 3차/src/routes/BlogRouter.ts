import { Router } from "express";
import { BlogController } from "../controllers";

const router: Router = Router();

router.post("/", BlogController.createBlog);
router.put("/:postId", BlogController.updateBlog);
router.get("/:postId", BlogController.findBlog);
router.delete("/:postId", BlogController.deleteBlog);

export default router;
