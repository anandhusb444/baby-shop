import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Replace this URL with your actual endpoint
      await axios.post('http://localhost:8000/contact', formData);
      setResponseMessage('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setResponseMessage('There was an error sending your message. Please try again later.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Main Header Section */}
      <section className="relative mb-8">
        <img
          className="w-full h-64 object-cover rounded-lg shadow-md"
          src="https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1717439400-mc_banner3_1920x650_june24_sleepsuits-100.jpg" // Replace with your image URL
          alt="Contact Us Header"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg">
          <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-lg text-white text-center px-4">
            We’d love to hear from you! If you have any questions or feedback, please feel free to reach out.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
        {responseMessage && (
          <div className="mt-4 text-center">
            <p className={`text-lg ${responseMessage.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
              {responseMessage}
            </p>
          </div>
        )}
      </section>
      <Footer/>
    </div>
    
  );
};

export default ContactUs;
