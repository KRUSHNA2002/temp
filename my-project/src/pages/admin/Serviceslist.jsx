import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    desc: "",
    price: "",
    perHour: "",
    img: null,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("https://photography-xzfi.onrender.com/api/services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`https://photography-xzfi.onrender.com/api/services/${id}`);
      setServices(services.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete service");
    }
  };

  const startEdit = (service) => {
    setEditingService(service._id);
    setEditData({
      title: service.title,
      desc: service.desc,
      price: service.price || "",
      perHour: service.perHour || "",
      img: null,
    });
  };

  const cancelEdit = () => {
    setEditingService(null);
    setEditData({ title: "", desc: "", price: "", perHour: "", img: null });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEditData({ ...editData, img: e.target.files[0] });
  };

  const saveEdit = async (id) => {
    try {
      const formData = new FormData();
      formData.append("title", editData.title);
      formData.append("desc", editData.desc);
    if (editData.price.trim() !== "") formData.append("price", editData.price);
if (editData.perHour.trim() !== "") formData.append("perHour", editData.perHour);
      if (editData.img) formData.append("img", editData.img);

      const res = await axios.put(
        `https://photography-xzfi.onrender.com/api/services/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setServices(services.map((s) => (s._id === id ? res.data : s)));
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Failed to update service");
    }
  };

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-lg bg-gray-50">
        Loading services...
      </div>
    );

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50 text-gray-800">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-600">Services Dashboard</h1>

        {/* Search */}
        <div className="relative">
          {showSearch ? (
            <div className="flex items-center space-x-2 bg-white border border-gray-300 p-2 rounded-xl shadow-sm">
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-xl px-3 py-1 transition w-64"
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

      {/* Service Cards */}
      {filteredServices.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No services found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((s) => (
            <div
              key={s._id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col transition-transform hover:scale-105"
            >
              {editingService === s._id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    className="border rounded px-3 py-2 mb-3 text-lg font-semibold"
                    placeholder="Service Title"
                  />
                  <textarea
                    name="desc"
                    value={editData.desc}
                    onChange={handleEditChange}
                    className="border rounded px-3 py-2 mb-3 resize-none h-24"
                    placeholder="Service Description"
                  />
                  <input
                    type="text"
                    name="price"
                    value={editData.price}
                    onChange={handleEditChange}
                    className="border rounded px-3 py-2 mb-3"
                    placeholder="Price (Rs)"
                  />
                  <input
                    type="text"
                    name="perHour"
                    value={editData.perHour}
                    onChange={handleEditChange}
                    className="border rounded px-3 py-2 mb-3"
                    placeholder="Per Hour / Duration"
                  />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-3 border rounded px-2 py-1"
                  />
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => saveEdit(s._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm transition flex-1"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow-sm transition flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {s.img ? (
                    <img
                      src={`https://photography-xzfi.onrender.com/${s.img}`}
                      alt={s.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-gray-500 font-semibold text-xl">
                        No Image
                      </span>
                    </div>
                  )}

                  <h2 className="text-xl font-bold mb-2">{s.title}</h2>

                  <div className="flex gap-4 mb-2 text-gray-700 font-medium">
                    {s.price && <span>{s.price} Rs</span>}
                    {s.perHour && <span>• {s.perHour}</span>}
                  </div>

                  <p className="text-gray-600 mb-4">{s.desc}</p>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => startEdit(s)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition flex-1 flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteService(s._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition flex-1 flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesList;