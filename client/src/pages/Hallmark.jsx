import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import XrayDetailsTable from "../Components/XrayDetailsTable";
import HallmarkDetailTable from "../Components/HallMarkDetailTable";

const XRay = () => {
  const { customers } = useContext(UserContext);
  const [hallMarkData, SetHallMarkData] = useState([]);
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
  });

  // Handle input change
  const handleInputChange = (e) => {
    let { id, value } = e.target;

    if (id === "quantity" || id === "rate") {
      value = parseFloat(value) || 0;
    }

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8003/createHallmark", formData)
      .then((result) => {
        // On success, update the xrayData with the newly added item
        SetHallMarkData((prevData) => [...prevData, result.data]); // Assuming the server returns the newly added X-ray data
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchHallMarkData = async () => {
      try {
        const response = await fetch("http://localhost:8003/hallmark");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        SetHallMarkData(data);
      } catch (error) {
        console.error("Error fetching HallmarkData:", error);
      }
    };
    fetchHallMarkData();
  }, []);

  return (
    <div className="min-h-screen p-6 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full mt-6">
        <h1 className="text-2xl font-semibold text-green-900 mb-6">HALLMARK</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Section */}
            <div className="col-span-1 space-y-4">
              <div>
                <label htmlFor="customerID" className="block text-[#004D40] font-bold">
                  Customer ID
                </label>
                <select
                  id="customerID"
                  className="w-full border-b border-gray-300 p-2 focus:ring focus:ring-green-400 focus:outline-none"
                  value={formData.customerID}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {customers &&
                    customers.map((customer) => (
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
                  className="w-full border-b border-gray-300 p-2 focus:ring focus:ring-green-400 focus:outline-none"
                  value={formData.company}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {customers &&
                    customers.map((customer) => (
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
                  className="w-full border-b border-gray-300 p-2 focus:ring focus:ring-green-400 focus:outline-none"
                  value={formData.item}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Middle Section */}
            <div className="col-span-1 space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-[#004D40] font-bold">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  className="w-full border-b border-gray-300 p-2 focus:ring focus:ring-green-400 focus:outline-none"
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
                  className="w-full border-b border-gray-300 p-2 focus:ring focus:ring-green-400 focus:outline-none"
                  value={formData.rate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="rate" className="block text-[#004D40] font-bold">
                  Weight
                </label>
                <input
                  id="weight"
                  type="number"
                  className="w-full border-b border-gray-300 p-2 focus:ring focus:ring-green-400 focus:outline-none"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="col-span-1 space-y-4">
              <div>
                <label htmlFor="amount" className="block text-[#004D40] font-bold">
                  Amount
                </label>
                <input
                  id="amount"
                  type="text"
                  readOnly
                  className="w-full border-b border-gray-300 p-2 text-[#004D40] focus:outline-none"
                  value={formData.amount}
                />
              </div>

              <div>
                <label htmlFor="xray" className="block text-[#004D40] font-bold">
                  Hallmark
                </label>
                <input
                  id="xray"
                  type="text"
                  className="w-full border-b border-gray-300 p-2 text-[#004D40] focus:outline-none"
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
                  className="w-full border-b border-gray-300 p-2 focus:ring focus:ring-green-400 focus:outline-none"
                  value={formData.customerFrom}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#004D40] text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>

        <div className="border-2  border-[#004D40] p-4 mt-4 rounded-lg">
          <HallmarkDetailTable hallMarkData={hallMarkData} />
        </div>
      </div>
    </div>
  );
};

export default XRay;
