import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, Typography, Input } from "@material-tailwind/react";

const TABLE_HEAD = ["CustomerID", "Item", "Weight", "Quantity", "Amount", "Date"];

const HallmarkDetailTable = ({ hallMarkData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const productsPerPage = 6;

    // Filter the data based on search query (only matching items will be included)
    const filteredData = hallMarkData.filter(({ item, company }) => {
        const lowerSearchQuery = searchQuery.toLowerCase().trim(); // Ensure case-insensitive comparison and strip extra spaces
        return (
            item.toLowerCase().includes(lowerSearchQuery) ||   // Match by item
            company.toLowerCase().includes(lowerSearchQuery)   // Match by company
        );
    });

    // Calculate the index of the first and last item on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // Slice the filtered data to show only the products for the current page
    const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredData.length / productsPerPage);

    // Handle page change (next and previous)
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page when search query changes
    };

    return (
        <Card className="h-full w-full">
            <CardBody className="overflow-scroll px-0">
                {/* Search Bar in Top Right */}
                <div className="flex justify-end mb-4">
                    <Input
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by Item or Company"
                        className="w-64"
                    />
                </div>

                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, index) => (
                                <th key={head} className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                        {head}
                                        {index !== TABLE_HEAD.length - 1 && <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts?.map(({ customerID, company, item, rate, weight, quantity, customerFrom, amount }, index) => {
                            const isLast = index === currentProducts.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={customerID}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal">{customerID}</Typography>
                                                <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{company}</Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal">{item}</Typography>
                                            <Typography variant="small" color="blue-gray" className="font-normal opacity-70">TK {rate}</Typography>
                                        </div>
                                    </td>
                                    <td className={classes}><Typography size="sm" value={weight}>{weight}</Typography></td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">{quantity}</Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">{amount}</Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">{customerFrom}</Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <button
                    onClick={handlePreviousPage}
                    className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {currentPage} of {totalPages}
                </Typography>
                <button
                    onClick={handleNextPage}
                    className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </Card>
    );
};

// Adding prop validation
HallmarkDetailTable.propTypes = {
    hallMarkData: PropTypes.array.isRequired,
};

export default HallmarkDetailTable;
