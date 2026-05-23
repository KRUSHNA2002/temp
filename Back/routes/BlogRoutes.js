const express = require("express");
const router = express.Router();

const Blog = require("../models/Blog");

const multer = require("multer");
const path = require("path");


// ================= MULTER STORAGE =================
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );

    },

});

const upload = multer({ storage });


// ================= CREATE BLOG =================
router.post(
    "/create",
    upload.single("image"),
    async (req, res) => {

        try {

            const blog = await Blog.create({

                title: req.body.title,

                image: req.file
                    ? req.file.filename
                    : "",

                excerpt: req.body.excerpt,

                fullText: req.body.fullText,

                date: req.body.date,

            });

            res.status(201).json({
                success: true,
                message: "Blog Created Successfully",
                blog,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                success: false,
                message: error.message,
            });

        }

    }
);


// ================= GET ALL BLOGS =================
router.get("/all", async (req, res) => {

    try {

        const blogs = await Blog.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            blogs,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

});


// ================= GET SINGLE BLOG =================
router.get("/:id", async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {

            return res.status(404).json({
                success: false,
                message: "Blog Not Found",
            });

        }

        res.status(200).json({
            success: true,
            blog,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

});


// ================= DELETE BLOG =================
router.delete("/:id", async (req, res) => {

    try {

        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Blog Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

});

// ================= UPDATE BLOG =================
router.put(
    "/:id",
    upload.single("image"),
    async (req, res) => {

        try {

            const existingBlog = await Blog.findById(
                req.params.id
            );

            if (!existingBlog) {

                return res.status(404).json({
                    success: false,
                    message: "Blog Not Found",
                });

            }

            // UPDATE DATA
            const updatedData = {

                title: req.body.title,

                excerpt: req.body.excerpt,

                fullText: req.body.fullText,

                date: req.body.date,

            };

            // IF NEW IMAGE UPLOADED
            if (req.file) {

                updatedData.image = req.file.filename;

            }

            const updatedBlog = await Blog.findByIdAndUpdate(

                req.params.id,

                updatedData,

                {
                    new: true,
                }

            );

            res.status(200).json({

                success: true,

                message: "Blog Updated Successfully",

                blog: updatedBlog,

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    }
);

module.exports = router;