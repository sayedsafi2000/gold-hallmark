import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ProfileImageUploader from "./ProfileImageUploader";

function CustomerInfoForm({ onAddCustomer }) {
    // State for form fields
    const [customerID, setCustomerId] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); // State for the selected image

    // Callback to receive image from ProfileImageUploader
    const handleImageSelect = (imageFile) => {
        setSelectedImage(imageFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            // Create FormData to include image and other fields
            const formData = new FormData();
            formData.append("customerID", customerID);
            formData.append("name", name);
            formData.append("contact", contact);
            formData.append("company", company);
            formData.append("address", address);
            if (selectedImage) {
                formData.append("image", selectedImage); // Append the image if selected
            }

            // POST request to add customer
            const response = await axios.post("http://localhost:8003/createUser", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);

            // Callback to notify parent component (if needed)
            if (onAddCustomer) {
                onAddCustomer(response.data);
            }

            // Reset form fields
            setCustomerId('');
            setName('');
            setContact('');
            setCompany('');
            setAddress('');
            setSelectedImage(null); // Reset the image
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-between sm:gap-10 lg:gap-16 bg-white"
        >
            {/* Left Section: Form Fields */}
            <div className="flex-1 w-2/3 lg:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold text-[#004D40] pb-2">Customer Information</h2>

                {/* Customer ID */}
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <input
                        type="text"
                        name="customerId"
                        className="flex-1 px-3 py-2 bg-[#E0F2F1] rounded-lg focus:ring focus:ring-blue-200 placeholder:text-[#004D40]"
                        placeholder="Customer ID"
                        value={customerID}
                        onChange={(e) => setCustomerId(e.target.value)}
                    />
                </div>

                {/* Customer Name */}
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <input
                        type="text"
                        name="name"
                        placeholder="Customer Name"
                        className="flex-1 px-3 py-2 bg-[#E0F2F1] rounded-lg focus:ring focus:ring-blue-200 placeholder:text-[#004D40]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Contact No */}
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact No"
                        className="flex-1 px-3 py-2 bg-[#E0F2F1] rounded-lg focus:ring focus:ring-blue-200 placeholder:text-[#004D40]"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>

                {/* Company Name */}
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        className="flex-1 px-3 py-2 bg-[#E0F2F1] rounded-lg focus:ring focus:ring-blue-200 placeholder:text-[#004D40]"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>

                {/* Address */}
                <div className="flex flex-col sm:flex-row sm:items-start">
                    <textarea
                        name="address"
                        placeholder="Address"
                        className="flex-1 px-3 py-2 bg-[#E0F2F1] rounded-lg focus:ring focus:ring-blue-200 placeholder:text-[#004D40]"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows="3"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="px-4 py-2 bg-[#004D40] text-white rounded-lg hover:bg-[#00332E]"
                >
                    Add Customer
                </button>
            </div>

            {/* Right Section: Profile Picture */}
            <ProfileImageUploader onImageSelect={handleImageSelect} />
        </form>
    );
}

// Prop type validation
CustomerInfoForm.propTypes = {
    onAddCustomer: PropTypes.func, // Optional callback when customer is added
};

export default CustomerInfoForm;
