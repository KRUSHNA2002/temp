const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(

    {

        question: {
            type: String,
            required: true,
        },

        answer: {
            type: String,
            default: "",
        },

        isPublished: {
            type: Boolean,
            default: false,
        },

    },

    {
        timestamps: true,
    }

);

module.exports = mongoose.model(
    "FAQ",
    faqSchema
);