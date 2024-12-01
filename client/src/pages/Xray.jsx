import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import XrayDetailsTable from "../Components/XrayDetailsTable";

const XRay = () => {
  const { customers } = useContext(UserContext);
  const [xrayData, setXrayData] = useState([]);
  const [formData, setFormData] = useState({
    customerID: "",
    company: "",
    item: "",
    quantity: "",
    weight: "",
    rate: "",
    amount: "",
    xray: "",
    customerFrom: "",
    image: null, // For file upload
  });

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "image") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0], // Store the selected file
      }));
    } else {
      setFormData((prevData) => {
        const newData = {
          ...prevData,
          [id]: value,
        };

        if (newData.quantity && newData.rate) {
          newData.amount = (parseFloat(newData.quantity) * parseFloat(newData.rate)).toFixed(2);
        }

        return newData;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });
  
    try {
      const response = await axios.post("http://localhost:8003/createXray", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Update the local state with the new record
      setXrayData((prevData) => [...prevData, response.data]);
  
      // Reset the form
      setFormData({
        customerID: "",
        company: "",
        item: "",
        quantity: "",
        weight: "",
        rate: "",
        amount: "",
        xray: "",
        customerFrom: "",
        image: null,
      });
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };
  

  useEffect(() => {
    const fetchXrayData = async () => {
      try {
        const response = await axios.get("http://localhost:8003/xray");
        setXrayData(response.data);
      } catch (error) {
        console.error("Error fetching X-ray data:", error);
      }
    };
    fetchXrayData();
  }, []);

  return (
    <div className="min-h-screen p-6 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full mt-6">
        <h1 className="text-2xl font-semibold text-green-900 mb-6">XRAY</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Section */}
            <div className="space-y-4">
              <div>
                <label htmlFor="customerID" className="block text-[#004D40] font-bold">
                  Customer ID
                </label>
                <select
                  id="customerID"
                  className="w-full border-b border-gray-300 p-2"
                  value={formData.customerID}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {customers?.map((customer) => (
                    <option key={customer._id} value={customer.customerID}>
                      {customer.customerID}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="company" className="block text-[#004D40] font-bold">
                  Company Name
                </label>
                <select
                  id="company"
                  className="w-full border-b border-gray-300 p-2"
                  value={formData.company}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {customers?.map((customer) => (
                    <option key={customer._id} value={customer.company}>
                      {customer.company}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="item" className="block text-[#004D40] font-bold">
                  Item Name
                </label>
                <input
                  id="item"
                  type="text"
                  className="w-full border-b border-gray-300 p-2"
                  value={formData.item}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-[#004D40] font-bold">
                  Upload Image
                </label>
                <input
                  id="image"
                  type="file"
                  className="w-full border-b border-gray-300 p-2"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Middle Section */}
            <div className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-[#004D40] font-bold">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  className="w-full border-b border-gray-300 p-2"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="rate" className="block text-[#004D40] font-bold">
                  Rate
                </label>
                <input
                  id="rate"
                  type="number"
                  className="w-full border-b border-gray-300 p-2"
                  value={formData.rate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="weight" className="block text-[#004D40] font-bold">
                  Weight
                </label>
                <input
                  id="weight"
                  type="number"
                  className="w-full border-b border-gray-300 p-2"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-[#004D40] font-bold">
                  Amount
                </label>
                <input
                  id="amount"
                  type="text"
                  readOnly
                  className="w-full border-b border-gray-300 p-2 text-[#004D40]"
                  value={formData.amount}
                />
              </div>
              <div>
                <label htmlFor="xray" className="block text-[#004D40] font-bold">
                  X-ray
                </label>
                <input
                  id="xray"
                  type="text"
                  className="w-full border-b border-gray-300 p-2"
                  value={formData.xray}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="customerFrom" className="block text-[#004D40] font-bold">
                  Customer From
                </label>
                <input
                  id="customerFrom"
                  type="date"
                  className="w-full border-b border-gray-300 p-2"
                  value={formData.customerFrom}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="mt-4 bg-[#004D40] text-white py-2 px-4 rounded-lg">
            Submit
          </button>
        </form>

        <div className="border-2 border-[#004D40] p-4 mt-4 rounded-lg">
          <XrayDetailsTable xrayData={xrayData} />
        </div>
      </div>
    </div>
  );
};

export default XRay;
