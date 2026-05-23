const express = require("express");

const router = express.Router();

const FAQ = require("../models/FAQ");


// ================= ASK QUESTION =================
router.post("/ask", async (req, res) => {

    try {

        const faq = await FAQ.create({

            question: req.body.question,

        });

        res.status(201).json({

            success: true,

            message: "Question Submitted Successfully",

            faq,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

});


// ================= GET ALL FAQ =================
router.get("/all", async (req, res) => {

    try {

        const faqs = await FAQ.find({

            isPublished: true,

        }).sort({

            createdAt: -1,

        });

        res.status(200).json({

            success: true,

            faqs,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

});


// ================= ADMIN GET ALL QUESTIONS =================
router.get("/admin/all", async (req, res) => {

    try {

        const faqs = await FAQ.find().sort({

            createdAt: -1,

        });

        res.status(200).json({

            success: true,

            faqs,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

});


// ================= ADD ANSWER =================
router.put("/answer/:id", async (req, res) => {

    try {

        const faq = await FAQ.findByIdAndUpdate(

            req.params.id,

            {

                answer: req.body.answer,

            },

            {

                new: true,

            }

        );

        res.status(200).json({

            success: true,

            message: "Answer Added Successfully",

            faq,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

});


// ================= PUBLISH FAQ =================
router.put("/publish/:id", async (req, res) => {

    try {

        const faq = await FAQ.findById(
            req.params.id
        );

        if (!faq) {

            return res.status(404).json({

                success: false,

                message: "FAQ Not Found",

            });

        }

        // TOGGLE
        faq.isPublished = !faq.isPublished;

        await faq.save();

        res.status(200).json({

            success: true,

            message: faq.isPublished
                ? "FAQ Published Successfully"
                : "FAQ Unpublished Successfully",

            faq,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

});


// ================= DELETE FAQ =================
router.delete("/:id", async (req, res) => {

    try {

        await FAQ.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            success: true,

            message: "FAQ Deleted Successfully",

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

});

module.exports = router;