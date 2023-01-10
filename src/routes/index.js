import express from "express"
import { authController } from "../controllers/auth.controller.js"
import { userController } from "../controllers/user.controller.js"
import { articlesController } from "../controllers/article.controller.js"
import { upload } from "../middlewares/MulterMiddleWare.js"

const router = express.Router();

router.post("/auth/signin", authController.signin);
router.post("/auth/signup", authController.signup);
router.get("/get-user/:_id", userController.getUser);

router.get("/get-articles", articlesController.get);
router.get("/getone-articles/:id", articlesController.getOne);
router.post("/post-articles/:id", articlesController.upload);
router.patch("/update-articles/:id", articlesController.update);
router.delete("/delete-articles/:id", articlesController.delete);
export default router;