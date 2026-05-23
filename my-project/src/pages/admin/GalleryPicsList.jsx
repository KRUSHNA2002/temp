import React, { useState, useEffect } from 'react'
import axios from "axios";
import { FaSearch, FaTimes } from "react-icons/fa";
const GalleryPicsList = () => {

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [allPhotos, setallPhotos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get("https://photography-xzfi.onrender.com/api/gallery");
                setallPhotos(response.data.data);
            } catch (err) {
                console.error("Error fetching gallery:", err);
            }
        };

        fetchGallery();
    }, []);

    const categories = ["All", ...new Set(allPhotos.map(item => item.category))];

   const filteredPhotos = allPhotos.filter(
  (item) =>
    (selectedCategory === "All" ||
      item.category === selectedCategory) &&
    item.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
);


    const handleDelete = async (id) => {

  try {

    await axios.delete(
      `https://photography-xzfi.onrender.com/api/gallery/${id}`
    );

    alert("Deleted Successfully");

    setallPhotos((prev) =>
      prev.filter((item) => item._id !== id)
    );

  } catch (error) {

    console.log(error);
    alert("Delete Failed");
  }
};
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">

                {/* Title */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Gallery Dashboard
                    </h1>

                    <p className="text-gray-500 mt-1 text-sm">
                        Manage gallery images professionally
                    </p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-5 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >

                        {categories.map((cat, index) => (

                            <option key={index} value={cat}>
                                {cat}
                            </option>

                        ))}

                    </select>

                    {/* Search */}
                    <div className="relative">

                        {showSearch ? (

                            <div className="flex items-center space-x-2 bg-white border border-gray-300 p-2 rounded-xl shadow-sm">

                                <input
                                    type="text"
                                    placeholder="Search category..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-white text-gray-800 placeholder-gray-400 focus:outline-none rounded-xl px-3 py-1 w-52"
                                />

                                <button
                                    onClick={() => {
                                        setShowSearch(false);
                                        setSearchTerm("");
                                    }}
                                    className="text-gray-500 hover:text-red-500 transition"
                                >
                                    <FaTimes size={16} />
                                </button>

                            </div>

                        ) : (

                            <button
                                onClick={() => setShowSearch(true)}
                                className="p-3 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition"
                            >
                                <FaSearch className="text-gray-600" size={16} />
                            </button>

                        )}

                    </div>

                </div>

            </div>
            <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-200 bg-white px-16">

                <table className="min-w-full divide-y divide-gray-200">

                    {/* Table Head */}
                    <thead className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                Image
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                Category
                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                                Action
                            </th>

                        </tr>

                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-gray-100">

                        {filteredPhotos.map((photo, idx) => (

                            <tr
                                key={idx}
                                className="hover:bg-gray-50 transition duration-300"
                            >

                                {/* Image */}
                                <td className="px-6 py-4">

                                    <div className="overflow-hidden rounded-xl shadow-md w-36 h-24">

                                        <img
                                            src={`https://photography-xzfi.onrender.com/${photo.image}`}
                                            alt={photo.category}
                                            className="w-full h-full object-cover hover:scale-110 transition duration-500"
                                        />

                                    </div>

                                </td>

                                {/* Category */}
                                <td className="px-6 py-4">

                                    <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-1 rounded-full">
                                        {photo.category}
                                    </span>

                                </td>

                                {/* Delete Button */}
                                <td className="px-6 py-4 text-center">

                                    <button
                                        onClick={() => handleDelete(photo._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    )
}

export default GalleryPicsList