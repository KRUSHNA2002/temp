import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const BookDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await fetch("https://photography-xzfi.onrender.com/api/bookings/all");
      const data = await response.json();
      if (response.ok) setBookings(data.data);
      else alert("Failed to fetch bookings: " + data.message);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await fetch(`https://photography-xzfi.onrender.com/api/bookings/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        alert("Booking deleted successfully");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert("Failed to delete booking: " + data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const sortedBookings = [...bookings]
    .filter(
      (b) =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.package.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-lg bg-gray-50">
        Loading bookings...
      </div>
    );

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-600 pl-6">Booking Dashboard</h1>

        {/* Search Icon & Toggle */}
        <div className="relative">
          {showSearch ? (
            <div className="flex items-center space-x-2 bg-white border border-gray-300 p-2 rounded-xl shadow-sm">
              <input
                type="text"
                placeholder="Search by name, email, package..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-xl px-3 py-1 transition w-64"
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchTerm("");
                }}
                className="text-gray-500 hover:text-red-500 transition"
              >
                <FaTimes size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-3 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition"
            >
              <FaSearch className="text-gray-600" size={18} />
            </button>
          )}
        </div>
      </div>

      {sortedBookings.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No bookings found</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {[
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  { key: "date", label: "Date" },
                  { key: "phoneno", label: "Phone" },
                  { key: "package", label: "Package" },
                  { key: "message", label: "Message" },
                  { key: "actions", label: "Actions" },
                ].map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => col.key !== "actions" && requestSort(col.key)}
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {sortConfig.key === col.key ? (
                        sortConfig.direction === "asc" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        col.key !== "actions" && <FaSort className="text-gray-400" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedBookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{b.name}</td>
                  <td className="px-6 py-4">{b.email}</td>
                  <td className="px-6 py-4">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{b.phoneno}</td>
                  <td className="px-6 py-4">{b.package}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedMessage(b.message);
                        setShowModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 underline text-left font-medium transition"
                    >
                      {b.message?.length > 25
                        ? "View Message"
                        : "View Message"}
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteBooking(b._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          {/* MESSAGE MODAL */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn">

                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
                >
                  ✕
                </button>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Full Message
                </h2>

                <div className="bg-gray-100 p-4 rounded-xl text-gray-700 whitespace-pre-wrap break-words max-h-[400px] overflow-y-auto">
                  {selectedMessage}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookDetails;