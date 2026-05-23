import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

const DynamicBlog = () => {

    const [data, setData] = useState({
        title: "",
        image: null,
        excerpt: "",
        fullText: "",
        date: "",
    });

    const [blogs, setBlogs] = useState([]);
    const [showBlogs, setShowBlogs] = useState(false);
    const [search, setSearch] = useState("");
    const [editId, setEditId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    // ================= HANDLE INPUT =================
    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value,
        });

    };

    // ================= IMAGE CHANGE =================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        setData({
            ...data,
            image: file,
        });

        // LIVE PREVIEW
        setPreviewImage(
            URL.createObjectURL(file)
        );

    };

    // ================= ADD BLOG =================
    // HANDLE SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("excerpt", data.excerpt);
            formData.append("fullText", data.fullText);
            formData.append("date", data.date);

            if (data.image) {

                formData.append("image", data.image);

            }

            // UPDATE
            if (isEdit) {

                const res = await axios.put(

                    `https://photography-xzfi.onrender.com/api/blog/${editId}`,

                    formData,

                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }

                );

                alert(res.data.message);

            }

            // CREATE
            else {

                const res = await axios.post(

                    "https://photography-xzfi.onrender.com/api/blog/create",

                    formData,

                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }

                );

                alert(res.data.message);

            }

            fetchBlogs();

            setData({
                title: "",
                image: null,
                excerpt: "",
                fullText: "",
                date: "",
            });

            setPreviewImage("");
            setIsEdit(false);

            setEditId(null);

        } catch (error) {

            console.log(error);

        }

    };

    // ================= EDIT BLOG =================
    const editBlog = (blog) => {

        setData({

            title: blog.title,

            image: null,

            excerpt: blog.excerpt,

            fullText: blog.fullText,

            date: blog.date,

        });

        // SHOW OLD IMAGE
        setPreviewImage(
            `https://photography-xzfi.onrender.com/uploads/${blog.image}`
        );

        setEditId(blog._id);

        setIsEdit(true);

        setShowBlogs(false);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };

    // ================= FETCH BLOGS =================
    const fetchBlogs = async () => {

        try {

            const res = await axios.get(
                "https://photography-xzfi.onrender.com/api/blog/all"
            );

            setBlogs(res.data.blogs);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchBlogs();

    }, []);

    // ================= DELETE BLOG =================
    const deleteBlog = async (id) => {

        try {

            await axios.delete(
                `https://photography-xzfi.onrender.com/api/blog/${id}`
            );

            alert("Blog Deleted Successfully");

            fetchBlogs();

        } catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    };

    // ================= SEARCH =================
    const filteredBlogs = blogs.filter((item) =>
        (item.title || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (item.excerpt || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (item.fullText || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="min-h-screen bg-gray-100 p-6 md:p-10">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">

                    <div>

                        <h1 className="text-4xl font-bold text-gray-800">
                            Blog CMS
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage Photography Blogs
                        </p>

                    </div>

                    {/* VIEW BLOGS BUTTON */}
                    <button
                        onClick={() => setShowBlogs(true)}
                        className="bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
                    >
                        View Blogs ({blogs.length})
                    </button>

                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 space-y-6"
                    >

                        {/* TITLE */}
                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Blog Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={handleChange}
                                placeholder="Enter Blog Title"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-400 outline-none transition"
                            />

                        </div>

                        {/* IMAGE */}
                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Choose Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-400 outline-none transition bg-white"
                            />

                        </div>

                        {/* DATE */}
                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Blog Date
                            </label>

                            <input
                                type="text"
                                name="date"
                                value={data.date}
                                onChange={handleChange}
                                placeholder="May 20, 2026"
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-400 outline-none transition"
                            />

                        </div>

                        {/* EXCERPT */}
                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Short Description
                            </label>

                            <textarea
                                rows="4"
                                name="excerpt"
                                value={data.excerpt}
                                onChange={handleChange}
                                placeholder="Short Blog Description..."
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-400 outline-none transition resize-none"
                            ></textarea>

                        </div>

                        {/* FULL TEXT */}
                        <div>

                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Full Blog Content
                            </label>

                            <textarea
                                rows="7"
                                name="fullText"
                                value={data.fullText}
                                onChange={handleChange}
                                placeholder="Write Full Blog Content..."
                                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-pink-400 outline-none transition resize-none"
                            ></textarea>

                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-red-400 text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.01] transition"
                        >
                            {
                                isEdit ? "Update Blog" : "Save Blog"
                            }
                        </button>

                    </form>

                    {/* LIVE PREVIEW */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 h-fit sticky top-6">

                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            Live Preview
                        </h2>

                        <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">

                            {/* IMAGE */}
                            {
                                previewImage ? (

                                    <img
                                        src={previewImage}
                                        alt="preview"
                                        className="w-full h-56 object-cover"
                                    />

                                ) : (

                                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">

                                        <FaBlog className="text-7xl text-pink-400" />

                                    </div>

                                )
                            }

                            <div className="p-5">

                                <h3 className="text-2xl font-bold text-gray-800">
                                    {data.title || "Blog Title"}
                                </h3>

                                <p className="text-sm text-pink-500 mt-2">
                                    {data.date || "Blog Date"}
                                </p>

                                <p className="text-gray-600 mt-5 leading-7">
                                    {data.excerpt ||
                                        "Blog short description preview..."}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* BLOG MODAL */}
                {
                    showBlogs && (

                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

                            <div className="bg-white w-full max-w-6xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto">

                                {/* HEADER */}
                                <div className="flex justify-between items-center mb-6">

                                    <h2 className="text-3xl font-bold text-gray-800">
                                        All Blogs
                                    </h2>

                                    <button
                                        onClick={() => setShowBlogs(false)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                                    >
                                        Close
                                    </button>

                                </div>

                                {/* SEARCH */}
                                <div className="mb-6">

                                    <input
                                        type="text"
                                        placeholder="Search blogs..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-400"
                                    />

                                </div>

                                {/* BLOG LIST */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {
                                        filteredBlogs.map((item) => (

                                            <div
                                                key={item._id}
                                                className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition"
                                            >

                                                <img
                                                    src={`https://photography-xzfi.onrender.com/uploads/${item.image}`}
                                                    alt={item.title}
                                                    className="w-full h-60 object-cover"
                                                />

                                                <div className="p-5">

                                                    <h3 className="text-2xl font-bold text-gray-800">
                                                        {item.title}
                                                    </h3>

                                                    <p className="text-pink-500 text-sm mt-2">
                                                        {item.date}
                                                    </p>

                                                    <p className="text-gray-600 leading-7 mt-4">
                                                        {item.excerpt}
                                                    </p>

                                                    <div className="flex flex-wrap gap-3 mt-6">

                                                        <Link
                                                            to={`/blogdetails/${item._id}`}
                                                            className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition"
                                                        >
                                                            View
                                                        </Link>

                                                        <button
                                                            onClick={() => deleteBlog(item._id)}
                                                            className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition"
                                                        >
                                                            Delete
                                                        </button>

                                                        <button
                                                            onClick={() => editBlog(item)}
                                                            className="
                                                            bg-yellow-500
                                                            text-white
                                                            px-5
                                                            py-3
                                                            rounded-xl
                                                            hover:bg-yellow-600
                                                            transition
                                                           "
                                                        >
                                                            Update
                                                        </button>


                                                    </div>

                                                </div>

                                            </div>

                                        ))
                                    }

                                    {
                                        filteredBlogs.length === 0 && (

                                            <div className="text-center py-10 text-gray-500 text-lg col-span-2">
                                                No Blogs Found
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

export default DynamicBlog;