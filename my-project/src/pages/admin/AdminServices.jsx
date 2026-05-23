import React, { useState } from "react";
import axios from "axios";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: "",
    desc: "",
    price: "",
    perHour: "",
    img: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewService({ ...newService, img: e.target.files[0] });
  };

  const addServiceToList = () => {
    if (!newService.title || !newService.desc || !newService.img) {
      return alert("Please fill all required fields!");
    }
    setServices([...services, { ...newService, id: Date.now() }]);
    setNewService({ title: "", desc: "", price: "", perHour: "", img: null });
  };

  const submitServices = async () => {
    try {
      for (let service of services) {
        const formData = new FormData();
        formData.append("title", service.title);
        formData.append("desc", service.desc);
        formData.append("price", service.price);
        formData.append("perHour", service.perHour);
        formData.append("img", service.img);

        await axios.post("https://photography-xzfi.onrender.com/api/services", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      alert("All services added successfully!");
      setServices([]);
    } catch (err) {
      console.error(err);
      alert("Error adding services");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-10 text-center">
        Admin Services
      </h1>

      {/* Services Preview Grid */}
      {services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 transition hover:scale-105"
            >
              {service.img && (
                <img
                  src={URL.createObjectURL(service.img)}
                  alt={service.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
              <h2 className="text-xl font-semibold text-gray-700 text-center">
                {service.title}
              </h2>
              <p className="text-gray-500 text-center">{service.desc}</p>
              <div className="flex justify-center gap-6 text-gray-600">
                <span>💰 ${service.price || "-"}</span>
                <span>⏱ {service.perHour || "-"} / hr</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Service Form */}
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Add New Service
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Service Title *"
          value={newService.title}
          onChange={handleInputChange}
          className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <textarea
          name="desc"
          placeholder="Service Description *"
          value={newService.desc}
          onChange={handleInputChange}
          rows={5}
          className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
        />

        <div className="flex gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price ($)"
            value={newService.price}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-xl w-1/2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="text"
            name="perHour"
            placeholder="Per Hour (e.g., 2h)"
            value={newService.perHour}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-xl w-1/2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-amber-400">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {newService.img && (
            <img
              src={URL.createObjectURL(newService.img)}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg mx-auto mt-4"
            />
          )}
        </div>

        <button
          onClick={addServiceToList}
          className="mt-4 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-white font-bold rounded-2xl transition"
        >
          Add to List
        </button>

        {services.length > 0 && (
          <button
            onClick={submitServices}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition"
          >
            Submit All Services
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminServices;