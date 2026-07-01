const express = require('express');
const { dasboardContoller, addContoller, addBlogContoller, viewBlogController, editController, updateController, deleteController, viewController } = require('../../controllers/dasboardContollers/dasboardContoller');
const upload = require('../../middlewares/multer');
const { loginCheck } = require('../../middlewares/authenticate');

const dasboardRoutes = express.Router();

dasboardRoutes.get("/", loginCheck, dasboardContoller);
dasboardRoutes.get("/add", loginCheck, addContoller);
dasboardRoutes.post("/addBlog", upload.single("image"), addBlogContoller);
dasboardRoutes.get("/view-Blogs", loginCheck, viewBlogController);
dasboardRoutes.get("/edit/:id", loginCheck, editController);
dasboardRoutes.get("/delete/:id", loginCheck, deleteController);
dasboardRoutes.get("/view/:id", loginCheck, viewController);
dasboardRoutes.post("/updateBlog", upload.single("image"), updateController);

module.exports = dasboardRoutes;