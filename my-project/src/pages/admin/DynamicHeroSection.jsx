import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

const DynamicHeroSection = () => {

  const [data, setData] = useState({
    headline: "",
    title: "",
    desc: "",
    btn1: "",
    btn2: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {

    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://photography-xzfi.onrender.com/api/herosection",
        data
      );

      alert(
        "Hero Section Updated"
      );

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH DATA
  useEffect(() => {

    const fetchData = async () => {

      try {

        const response =
          await axios.get(
            "https://photography-xzfi.onrender.com/api/herosection"
          );

        if (
          response.data.heroEntry &&
          response.data.heroEntry.length > 0
        ) {

          const hero =
            response.data.heroEntry[0];

          setData({
            headline:
              hero.headline || "",
            title:
              hero.title || "",
            desc:
              hero.desc || "",
            btn1:
              hero.btn1 || "",
            btn2:
              hero.btn2 || "",
          });
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
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Hero Section CMS
          </h1>

          <p className="text-gray-500 mt-2">
            Manage Hero Section Content
          </p>

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 space-y-6"
          >

            {/* HEADLINE */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Headline
              </label>

              <input
                type="text"
                name="headline"
                value={data.headline}
                onChange={handleChange}
                placeholder="Professional Photography"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-400 outline-none"
              />

            </div>

            {/* TITLE */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Main Title
              </label>

              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="Capturing Beautiful Moments"
                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-400 outline-none"
              />

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                rows="5"
                name="desc"
                value={data.desc}
                onChange={handleChange}
                placeholder="Write Hero Description..."
                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-400 outline-none resize-none"
              />

            </div>

            {/* BUTTONS */}
            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Button 1
                </label>

                <input
                  type="text"
                  name="btn1"
                  value={data.btn1}
                  onChange={handleChange}
                  placeholder="View Gallery"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-400 outline-none"
                />

              </div>

              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Button 2
                </label>

                <input
                  type="text"
                  name="btn2"
                  value={data.btn2}
                  onChange={handleChange}
                  placeholder="Book Now"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-amber-400 outline-none"
                />

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black py-4 rounded-2xl font-bold text-lg hover:scale-[1.01] transition"
            >
              Save Hero Section
            </button>

          </form>

          {/* LIVE PREVIEW */}
          <div className="bg-white rounded-3xl shadow-xl p-8 h-fit sticky top-6">

            <p className="text-amber-500 uppercase tracking-[4px] text-sm font-semibold">
              {data.headline ||
                "Professional Photography"}
            </p>

            <h2 className="text-4xl font-bold text-gray-800 mt-4 leading-tight">
              {data.title ||
                "Capturing Beautiful Moments"}
            </h2>

            <p className="text-gray-600 mt-6 leading-8">
              {data.desc ||
                "Hero description preview will appear here."}
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">

              <button className="bg-amber-500 text-black px-6 py-3 rounded-xl font-semibold">
                {data.btn1 ||
                  "View Gallery"}
              </button>

              <button className="bg-gray-200 text-black px-6 py-3 rounded-xl font-semibold">
                {data.btn2 ||
                  "Book Now"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DynamicHeroSection;