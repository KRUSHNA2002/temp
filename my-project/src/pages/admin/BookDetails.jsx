import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaBoxOpen,
  FaCheckCircle,
} from "react-icons/fa";

const BookDetails = () => {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  // FETCH BOOKINGS
  const fetchBookings = async () => {

    try {

      const response = await fetch(
        "https://photography-xzfi.onrender.com/api/bookings/all"
      );

      const data = await response.json();

      if (response.ok) {

        setBookings(data.data);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // DELETE BOOKING
  const deleteBooking = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this booking?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `https://photography-xzfi.onrender.com/api/bookings/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {

        setBookings((prev) =>
          prev.filter((item) => item._id !== id)
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  // TOGGLE STATUS
  const toggleStatus = async (id) => {

    try {

      const response = await fetch(
        `https://photography-xzfi.onrender.com/api/bookings/status/${id}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {

        fetchBookings();

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchBookings();

  }, []);

  // SEARCH FILTER
  const filteredBookings = bookings.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.package.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const today = new Date();

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-yellow-600 text-xl font-semibold">
        Loading Bookings...
      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

          <div>

            <h1 className="text-5xl font-black leading-tight text-gray-800">

              Booking
              <span className="text-yellow-600"> Dashboard</span>

            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Manage your photography bookings professionally
            </p>

          </div>

          {/* SEARCH */}
          <div className="relative w-full lg:w-[350px]">

            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-2xl py-4 pl-14 pr-5 text-gray-800 placeholder:text-gray-400 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 transition"
            />

            <FaSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400" />

          </div>

        </div>

        {/* EMPTY */}
        {filteredBookings.length === 0 ? (

          <div className="bg-white border border-gray-200 rounded-3xl p-20 text-center text-gray-500 text-xl shadow-lg">

            No Bookings Found

          </div>

        ) : (

          /* CARDS */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

            {filteredBookings.map((b) => {

              const bookingDate = new Date(b.date);

              const isExpired = bookingDate < today;

              return (

                <div
                  key={b._id}
                  className="bg-white border border-gray-200 rounded-[30px] p-7 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-5">

                    <div className="flex items-center gap-4">

                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">

                        {b.name?.charAt(0)}

                      </div>

                      <div>

                        <h2 className="text-2xl font-bold text-gray-800">
                          {b.name}
                        </h2>

                        <p className="text-yellow-600 text-sm mt-1 font-medium">
                          {b.package}
                        </p>

                      </div>

                    </div>

                    {/* STATUS + DELETE */}
                    <div className="flex items-center gap-3">

                      {/* DONE / PENDING */}
                      <button
                        onClick={() => toggleStatus(b._id)}
                        className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${b.status === "Done"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >

                        <FaCheckCircle />

                        {b.status === "Done"
                          ? "Done"
                          : "Pending"}

                      </button>

                      {/* EXPIRED */}
                      {isExpired ? (

                        <span className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold">
                          Expired
                        </span>

                      ) : (

                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold">
                          Upcoming
                        </span>

                      )}

                      {/* DELETE */}
                      <button
                        onClick={() => deleteBooking(b._id)}
                        className="w-12 h-12 rounded-2xl bg-red-100 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all duration-300"
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </div>

                  {/* DETAILS */}
                  <div className="mt-8 space-y-5">

                    {/* EMAIL */}
                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">

                        <FaEnvelope />

                      </div>

                      <div>

                        <p className="text-gray-400 text-sm">
                          Email
                        </p>

                        <p className="text-gray-800 break-all font-medium">
                          {b.email}
                        </p>

                      </div>

                    </div>

                    {/* PHONE */}
                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">

                        <FaPhoneAlt />

                      </div>

                      <div>

                        <p className="text-gray-400 text-sm">
                          Phone
                        </p>

                        <p className="text-gray-800 font-medium">
                          {b.phoneno}
                        </p>

                      </div>

                    </div>

                    {/* DATE */}
                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">

                        <FaCalendarAlt />

                      </div>

                      <div>

                        <p className="text-gray-400 text-sm">
                          Booking Date
                        </p>

                        <p className="text-gray-800 font-medium">
                          {new Date(
                            b.date
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                    {/* PACKAGE */}
                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">

                        <FaBoxOpen />

                      </div>

                      <div>

                        <p className="text-gray-400 text-sm">
                          Package
                        </p>

                        <p className="text-gray-800 font-medium">
                          {b.package}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* MESSAGE BUTTON */}
                  <div className="mt-8">

                    <button
                      onClick={() => {
                        setSelectedMessage(b.message);
                        setShowModal(true);
                      }}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    >

                      View Client Message

                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

      {/* MESSAGE MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white border border-gray-200 rounded-[35px] max-w-2xl w-full p-8 relative shadow-2xl">

            {/* CLOSE */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-gray-100 hover:bg-red-500 text-gray-500 hover:text-white flex items-center justify-center transition-all"
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-4xl font-black mb-8 text-gray-800">

              Client
              <span className="text-yellow-600"> Message</span>

            </h2>

            {/* MESSAGE */}
            <div className="bg-gray-100 border border-gray-200 rounded-3xl p-6 text-gray-700 leading-8 max-h-[400px] overflow-y-auto whitespace-pre-wrap break-words">

              {selectedMessage || "No message available"}

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default BookDetails;