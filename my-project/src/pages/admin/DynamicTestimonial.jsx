import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const DynamicTestimonial = () => {

    const [data, setData] = useState({
        name: "",
        role: "",
        review: "",
    });

    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(false);
    const [search, setSearch] = useState("");

    // Handle Input
    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value,
        });

    };

    // Submit Testimonial
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!data.name || !data.role || !data.review) {

            alert("Please fill all fields");

            return;
        }

        try {

            const res = await axios.post(
                "https://photography-xzfi.onrender.com/api/testimonials/add",
                data
            );

            alert(res.data.message);

            // Refresh Testimonials
            fetchTestimonials();

            // Clear Form
            setData({
                name: "",
                role: "",
                review: "",
            });

        } catch (error) {

            console.log(error);

            alert("Something went wrong");

        }

    };

    // Fetch Testimonials
    const fetchTestimonials = async () => {

        try {

            const res = await axios.get(
                "https://photography-xzfi.onrender.com/api/testimonials"
            );

            setReviews(res.data.testimonials);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchTestimonials();

    }, []);

    // Delete Review
    const deleteReview = async (id) => {

        try {

            await axios.delete(
                `https://photography-xzfi.onrender.com/api/testimonials/${id}`
            );

            alert("Deleted Successfully");

            fetchTestimonials();

        } catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    };

    // Search Filter
    const filteredReviews = reviews.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase()) ||
        item.review.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="min-h-screen bg-gray-100 p-6 md:p-10">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">

                    <div>

                        <h1 className="text-4xl font-bold text-gray-800">
                            Testimonial CMS
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage client reviews and testimonials
                        </p>

                    </div>

                    {/* TOP RIGHT BUTTON */}
                    <button
                        onClick={() => setShowReviews(true)}
                        className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-6 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
                    >
                        View Testimonials ({reviews.length})
                    </button>

                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 space-y-6"
                    >

                        {/* NAME */}
                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Client Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                placeholder="Enter client name"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-400 outline-none transition"
                            />

                        </div>

                        {/* ROLE */}
                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Client Role
                            </label>

                            <input
                                type="text"
                                name="role"
                                value={data.role}
                                onChange={handleChange}
                                placeholder="Wedding Client"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-400 outline-none transition"
                            />

                        </div>

                        {/* REVIEW */}
                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Review Message
                            </label>

                            <textarea
                                rows="6"
                                name="review"
                                value={data.review}
                                onChange={handleChange}
                                placeholder="Write testimonial..."
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-400 outline-none transition resize-none"
                            ></textarea>

                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black py-4 rounded-2xl font-bold text-lg hover:scale-[1.01] transition"
                        >
                            Save Testimonial
                        </button>

                    </form>

                    {/* LIVE PREVIEW */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 h-fit sticky top-6">

                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            Live Preview
                        </h2>

                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">

                            <div className="flex items-center gap-4">

                                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">

                                    <FaUserCircle className="text-5xl text-amber-500" />

                                </div>

                                <div>

                                    <h3 className="text-xl font-bold text-gray-800">
                                        {data.name || "Client Name"}
                                    </h3>

                                    <p className="text-amber-500 text-sm">
                                        {data.role || "Client Role"}
                                    </p>

                                </div>

                            </div>

                            <p className="text-gray-600 mt-6 leading-7 italic">
                                "
                                {data.review ||
                                    "Client review preview will appear here..."}
                                "
                            </p>

                        </div>

                    </div>

                </div>

                {/* REVIEWS MODAL */}
                {
                    showReviews && (

                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

                            <div className="bg-white w-full max-w-4xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto">

                                {/* HEADER */}
                                <div className="flex justify-between items-center mb-6">

                                    <h2 className="text-3xl font-bold text-gray-800">
                                        All Testimonials
                                    </h2>

                                    <button
                                        onClick={() => setShowReviews(false)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                                    >
                                        Close
                                    </button>

                                </div>

                                {/* SEARCH */}
                                <div className="mb-6">

                                    <input
                                        type="text"
                                        placeholder="Search testimonials..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-400"
                                    />

                                </div>

                                {/* LIST */}
                                <div className="space-y-5">

                                    {
                                        filteredReviews.map((item) => (

                                            <div
                                                key={item._id}
                                                className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition"
                                            >

                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">

                                                    <div className="flex gap-4">

                                                        <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">

                                                            <FaUserCircle className="text-4xl text-amber-500" />

                                                        </div>

                                                        <div>

                                                            <h3 className="text-xl font-bold text-gray-800">
                                                                {item.name}
                                                            </h3>

                                                            <p className="text-amber-500 text-sm mb-3">
                                                                {item.role}
                                                            </p>

                                                            <p className="text-gray-600 leading-7">
                                                                {item.review}
                                                            </p>

                                                        </div>

                                                    </div>

                                                    {/* DELETE BUTTON */}
                                                    <button
                                                        onClick={() => deleteReview(item._id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition h-fit"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </div>

                                        ))
                                    }

                                    {
                                        filteredReviews.length === 0 && (

                                            <div className="text-center py-10 text-gray-500 text-lg">
                                                No Testimonials Found
                                            </div>

                                        )
                                    }

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>

    );
};

export default DynamicTestimonial;