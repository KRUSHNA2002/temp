import React, { useEffect, useState } from "react";

import axios from "axios";

const DynamicFaq = () => {

  const [faqs, setFaqs] = useState([]);

  const [search, setSearch] = useState("");

  const [answerData, setAnswerData] =
    useState({});

  const [openAction, setOpenAction] =
    useState(null);

  // ================= FETCH FAQ =================
  const fetchFaqs = async () => {

    try {

      const res = await axios.get(
        "https://photography-xzfi.onrender.com/api/faq/admin/all"
      );

      setFaqs(res.data.faqs);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchFaqs();

  }, []);

  // ================= ADD ANSWER =================
  const addAnswer = async (id) => {

    try {

      await axios.put(

        `https://photography-xzfi.onrender.com/api/faq/answer/${id}`,

        {
          answer: answerData[id],
        }

      );

      alert("Answer Added Successfully");

      fetchFaqs();

      setOpenAction(null);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= PUBLISH FAQ =================
const publishFaq = async (id) => {

  try {

    const res = await axios.put(
      `https://photography-xzfi.onrender.com/api/faq/publish/${id}`
    );

    // DYNAMIC MESSAGE
    alert(res.data.message);

    fetchFaqs();

  } catch (error) {

    console.log(error);

  }

};

  // ================= DELETE FAQ =================
  const deleteFaq = async (id) => {

    try {

      await axios.delete(
        `https://photography-xzfi.onrender.com/api/faq/${id}`
      );

      alert("FAQ Deleted Successfully");

      fetchFaqs();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= SEARCH =================
  const filteredFaqs = faqs.filter((item) =>

    (item.question || "")
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            FAQ CMS
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Manage User Questions & Answers
          </p>

        </div>

        {/* SEARCH */}
        <div className="mb-5">

          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              text-sm
              outline-none
              focus:ring-2
              focus:ring-amber-400
              bg-white
            "
          />

        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">

          {
            filteredFaqs.map((faq) => (

              <div
                key={faq._id}
                className="
                  bg-white
                  rounded-2xl
                  shadow-sm
                  p-4
                  border
                  border-gray-100
                "
              >

                {/* TOP */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                  {/* QUESTION */}
                  <div className="flex-1">

                    <h2 className="text-lg font-semibold text-gray-800 leading-7">
                      {faq.question}
                    </h2>

                    {/* STATUS */}
                    <div className="mt-2">

                      {
                        faq.isPublished ? (

                          <span className="
                            bg-green-100
                            text-green-700
                            px-3
                            py-1
                            rounded-lg
                            text-xs
                            font-medium
                          ">
                            Published
                          </span>

                        ) : (

                          <span className="
                            bg-yellow-100
                            text-yellow-700
                            px-3
                            py-1
                            rounded-lg
                            text-xs
                            font-medium
                          ">
                            Pending
                          </span>

                        )
                      }

                    </div>

                  </div>

                  {/* ACTION BUTTON */}
                  <button
                    onClick={() =>
                      setOpenAction(

                        openAction === faq._id
                          ? null
                          : faq._id

                      )
                    }
                    className="
                      bg-black
                      hover:bg-gray-800
                      text-white
                      px-4
                      py-2
                      text-sm
                      rounded-xl
                      transition
                      h-fit
                    "
                  >

                    {
                      openAction === faq._id
                        ? "Close"
                        : "Add Answer"
                    }

                  </button>

                </div>

                {/* CURRENT ANSWER */}
                <div className="mt-3">

                  <p className="text-gray-600 leading-6 text-sm">

                    {
                      faq.answer
                        ? faq.answer
                        : "No answer added yet"
                    }

                  </p>

                </div>

                {/* OPEN PANEL */}
                {
                  openAction === faq._id && (

                    <div className="mt-4 space-y-3">

                      {/* TEXTAREA */}
                      <textarea
                        rows="3"
                        placeholder="Write answer..."
                        value={
                          answerData[faq._id] || ""
                        }
                        onChange={(e) =>
                          setAnswerData({

                            ...answerData,

                            [faq._id]:
                              e.target.value,

                          })
                        }
                        className="
                          w-full
                          border
                          border-gray-300
                          rounded-xl
                          p-3
                          text-sm
                          outline-none
                          focus:ring-2
                          focus:ring-amber-400
                          resize-none
                        "
                      ></textarea>

                      {/* BUTTONS */}
                      <div className="flex flex-wrap gap-2">

                        {/* SAVE ANSWER */}
                        <button
                          onClick={() =>
                            addAnswer(faq._id)
                          }
                          className="
                            bg-blue-500
                            hover:bg-blue-600
                            text-white
                            px-4
                            py-2
                            text-sm
                            rounded-xl
                            transition
                          "
                        >
                          Save
                        </button>

                        {/* PUBLISH */}
                        <button
                          onClick={() =>
                            publishFaq(faq._id)
                          }
                          className={`
                          text-white
                          px-4
                          py-2
                          text-sm
                          rounded-xl
                          transition

                          ${faq.isPublished
                                                    ? "bg-yellow-500 hover:bg-yellow-600"
                                                    : "bg-green-500 hover:bg-green-600"
                                                  }
                        `}
                        >

                          {
                            faq.isPublished
                              ? "Unpublish"
                              : "Publish"
                          }

                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            deleteFaq(faq._id)
                          }
                          className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-4
                            py-2
                            text-sm
                            rounded-xl
                            transition
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  )
                }

              </div>

            ))
          }

          {/* EMPTY */}
          {
            filteredFaqs.length === 0 && (

              <div className="
                text-center
                py-10
                text-gray-500
                text-lg
              ">
                No Questions Found
              </div>

            )
          }

        </div>

      </div>

    </div>

  );

};

export default DynamicFaq;