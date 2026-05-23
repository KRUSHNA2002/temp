import React, { useState } from 'react';
import axios from 'axios';

const AdminGallery = () => {
  const [galleryData, setGalleryData] = useState({
    category: '',
    files: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'files') {
      setGalleryData({ ...galleryData, files: Array.from(files) });
    } else {
      setGalleryData({ ...galleryData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!galleryData.category || galleryData.files.length === 0) {
      return alert('Please fill in all fields!');
    }

    const formData = new FormData();
    formData.append('category', galleryData.category);
    galleryData.files.forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post(
        'https://photography-xzfi.onrender.com/api/gallery',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert('Upload successful');
      console.log(response.data);
    } catch (error) {
      alert('Upload failed');
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Upload Gallery Images
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            placeholder="Enter category"
            value={galleryData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="files">
            Upload Images
          </label>
          <input
            id="files"
            type="file"
            name="files"
            multiple
            onChange={handleChange}
            required
            className="w-full text-gray-600 file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default AdminGallery;