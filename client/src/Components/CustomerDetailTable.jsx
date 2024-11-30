import React from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "@material-tailwind/react";
import remove from "../assets/remove.png";
import pen from "../assets/pen.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

const TABLE_HEAD = ["Customer Id", "Customer Name", "Contact", "", ""];

export function CustomerDetailTable({ customers, onRemoveCustomer }) {

    const handleDelete = async (id) => {
        try {
            // Send DELETE request to the server
            const response = await axios.delete(`http://localhost:8003/deleteUser/${id}`);
            toast('Delete Successfull', {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            console.log(response.data.message); // Log success message (optional)

            // After deleting, call onRemoveCustomer to update the UI in the parent component
            onRemoveCustomer(id);
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    return (
        <Card className="h-full w-full overflow-scroll lg:overflow-hidden shadow-none">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="bg-[#E0F2F1] p-4">
                                <Typography
                                    variant="small"
                                    className="font-normal text-[#004D40] leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {customers.map(({ _id, customerID, name, contact }, index) => {
                        const isLast = index === customers.length - 1;
                        const classes = isLast ? "p-4" : "p-4";

                        return (
                            <tr key={_id}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-[#004D40]"
                                    >
                                        {customerID}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-[#004D40]"
                                    >
                                        {name}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-[#004D40]"
                                    >
                                        {contact}
                                    </Typography>
                                </td>
                                <Link to={`/updateuser/${_id}`}>
                                    <td className={classes}>
                                        <img src={pen} alt="Edit" />
                                    </td>
                                </Link>
                                <td className={classes}>
                                    <button onClick={() => handleDelete(_id)}>
                                        <img src={remove} alt="Remove" />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ToastContainer/>
        </Card>
    );
}

CustomerDetailTable.propTypes = {
    customers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            contact: PropTypes.string.isRequired,
            company: PropTypes.string,
            address: PropTypes.string,
        })
    ).isRequired,
    onRemoveCustomer: PropTypes.func.isRequired,
};

export default CustomerDetailTable;