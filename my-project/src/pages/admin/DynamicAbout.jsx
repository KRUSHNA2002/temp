import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaImage } from "react-icons/fa";

const DynamicAbout = () => {

const [data, setData] = useState({
  subtitle: "",
  title: "",
  desc1: "",
  desc2: "",
  clients: "",
  experience: "",
  awards: "",
  image: "",
});

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (files) {

      setData({
        ...data,
        [name]: files[0],
      });

      setPreview(URL.createObjectURL(files[0]));

    } else {

      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      await axios.post(
        "https://photography-xzfi.onrender.com/api/about",
        formData
      );

      alert("About Section Updated");

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

  const fetchData = async () => {

    try {

      const response = await axios.get(
        "https://photography-xzfi.onrender.com/api/about"
      );

      console.log(response.data);

      // CHECK DATA EXISTS
      if (
        response.data.aboutEntry &&
        response.data.aboutEntry.length > 0
      ) {

        const about =
          response.data.aboutEntry[0];

        setData({
          subtitle: about.subtitle || "",
          title: about.title || "",
          desc1: about.desc1 || "",
          desc2: about.desc2 || "",
          clients: about.clients || "",
          experience: about.experience || "",
          awards: about.awards || "",
          image: null,
        });

        if (about.image) {

          setPreview(
            `https://photography-xzfi.onrender.com/${about.image}`
          );
        }
      }

    } catch (error) {

      console.log(error);
    }
  };

  fetchData();

}, []);

  return (

    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              About Section CMS
            </h1>

            <p className="text-gray-500 mt-2">
              Manage and customize your About page
            </p>

          </div>

        </div>

        {/* MAIN CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 space-y-6"
          >

            {/* Subtitle */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Subtitle
              </label>

              <input
                type="text"
                name="subtitle"
                value={data.subtitle}
                onChange={handleChange}
                placeholder="About Our Studio"
                className="w-full border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none rounded-xl px-5 py-4 transition"
              />

            </div>

            {/* Title */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Main Title
              </label>

              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="Capturing Moments"
                className="w-full border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none rounded-xl px-5 py-4 transition"
              />

            </div>

            {/* Description */}
            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Description 1
                </label>

                <textarea
                  rows="5"
                  name="desc1"
                  value={data.desc1}
                  onChange={handleChange}
                  placeholder="Write first paragraph..."
                  className="w-full border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none rounded-xl px-5 py-4 transition resize-none"
                />

              </div>

              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Description 2
                </label>

                <textarea
                  rows="5"
                  name="desc2"
                  value={data.desc2}
                  onChange={handleChange}
                  placeholder="Write second paragraph..."
                  className="w-full border border-gray-300 focus:ring-2 focus:ring-amber-400 outline-none rounded-xl px-5 py-4 transition resize-none"
                />

              </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Clients
                </label>

                <input
                  type="text"
                  name="clients"
                  value={data.clients}
                  onChange={handleChange}
                  placeholder="300+"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-400 outline-none"
                />

              </div>

              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  value={data.experience}
                  onChange={handleChange}
                  placeholder="15 Years"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-400 outline-none"
                />

              </div>

              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Awards
                </label>

                <input
                  type="text"
                  name="awards"
                  value={data.awards}
                  onChange={handleChange}
                  placeholder="60+"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-400 outline-none"
                />

              </div>

            </div>

            {/* IMAGE */}
            <div>

              <label className="block mb-3 text-sm font-semibold text-gray-700">
                Upload About Image
              </label>

              <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-amber-400 transition bg-gray-50">

                <FaImage className="text-4xl text-gray-400 mb-4" />

                <p className="text-gray-500">
                  Click to upload image
                </p>

                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                />

              </label>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black py-4 rounded-2xl font-bold text-lg hover:scale-[1.01] transition"
            >
              Save About Section
            </button>

          </form>

          {/* LIVE PREVIEW */}
          <div className="bg-white rounded-3xl shadow-xl p-6 h-fit sticky top-6">

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Live Preview
            </h2>

            <div className="rounded-2xl overflow-hidden shadow-lg">

              {preview ? (

                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-72 object-cover"
                />

              ) : (

                <div className="h-72 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image Selected
                </div>

              )}

            </div>

            <div className="mt-6">

              <p className="text-amber-500 uppercase tracking-[3px] text-sm">
                {data.subtitle || "Subtitle"}
              </p>

              <h3 className="text-3xl font-bold mt-3 text-gray-800">
                {data.title || "Title"}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {data.desc1 || "Description preview"}
              </p>

            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-3 gap-4 mt-8 text-center">

              <div className="bg-gray-100 rounded-xl p-4">

                <h4 className="text-2xl font-bold text-amber-500">
                  {data.clients || "0"}
                </h4>

                <p className="text-sm text-gray-500">
                  Clients
                </p>

              </div>

              <div className="bg-gray-100 rounded-xl p-4">

                <h4 className="text-2xl font-bold text-amber-500">
                  {data.experience || "0"}
                </h4>

                <p className="text-sm text-gray-500">
                  Experience
                </p>

              </div>

              <div className="bg-gray-100 rounded-xl p-4">

                <h4 className="text-2xl font-bold text-amber-500">
                  {data.awards || "0"}
                </h4>

                <p className="text-sm text-gray-500">
                  Awards
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DynamicAbout;