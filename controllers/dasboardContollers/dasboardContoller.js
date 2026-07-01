const Blog = require("../../models/blogModels/blogModel");
const fs = require('fs');

const dasboardContoller = (req, res) => {
    res.render("index");
}

const addContoller = (req, res) => {
    res.render("addBlog");
}

const viewBlogController = async (req, res) => {
    try {
        let blogs = await Blog.find();

        res.render("view", { blogs });

    } catch (err) {
        console.log("Error: ", err);
        res.send("Something went wrong...");
    }
}

const addBlogContoller = async (req, res) => {
    try {

        let blog = await Blog.create({
            title: req.body.title,
            category: req.body.category,
            author: req.body.author,
            image: req.file.path,
            content: req.body.content,
        })

        res.redirect("/blogs/view-Blogs");

    } catch (err) {
        console.log("Error: ", err);
        res.send("Something Went Wrong...");
    }
}

const editController = async (req, res) => {
    try {

        let { id } = req.params;

        let blog = await Blog.findById(id);

        res.render("editBlog", { blog });

    } catch (err) {
        console.log("Error: ", err);
        res.send("Something Went Wrong...");
    }
}

const updateController = async (req, res) => {
    try {

        let blog = await Blog.findById(req.body.id);

        if (blog.image && req.file) {

            fs.unlink(blog.image, (err) => {
                if (err) {
                    console.log("Error deleting old image:", err);
                } else {
                    console.log("Old image deleted successfully");
                }
            })

            await Blog.findByIdAndUpdate(req.body.id, { ...req.body, image: req.file.path });
        } else {
            await Blog.findByIdAndUpdate(req.body.id, req.body);
        }


        res.redirect("/blogs/view-Blogs");

    } catch (err) {
        console.log("Error:", err);
        res.send("Something Went Wrong...");
    }
}

const deleteController = async (req, res) => {
    try {

        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (blog.image) {
            fs.unlink(blog.image, (err) => {
                if (err) {
                    console.log("Error deleting image:", err);
                } else {
                    console.log("Image deleted successfully");
                }
            });
        }

        await Blog.findByIdAndDelete(id);

        res.redirect("/blogs/view-Blogs");

    } catch (err) {
        console.log("Error: ", err);
        res.render("err");
    }
}

const viewController = async (req, res) => {
    try {

        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.send("Blog not found");
        }

        res.render("viewBlog", { blog });

    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

module.exports = {
    dasboardContoller,
    addContoller,
    addBlogContoller,
    viewBlogController,
    editController,
    updateController,
    deleteController,
    viewController
}