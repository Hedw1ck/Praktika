import React from 'react';
import axios from "axios";
import { VscChromeClose } from "react-icons/vsc";
import { FaCheckCircle } from "react-icons/fa";

const Addsubcategory = (props) => {
    if (props.type === "All") {
        props.addsubcategory(false);
        return null;
    }

    const [subcategory, setSubcategory] = React.useState("");
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    function handleAddSubcategory() {
        if (subcategory === "") {
            setError("Subcategory name is required");
            return;
        }

        setLoading(true);
        setError("");

        axios.get(`http://localhost:4000/productstype/?type=${props.type}`)
            .then((response) => {
                if (response.data.length === 0) {
                    setError("Category not found");
                    setLoading(false);
                    return;
                }

                const categoryId = response.data[0].id;
                const currentData = response.data[0];
                const currentSubcategories = currentData.subcategory || [];
                
                // Check if subcategory already exists
                if (currentSubcategories.includes(subcategory)) {
                    setError("This subcategory already exists");
                    setLoading(false);
                    return;
                }

                const updatedSubcategories = [...currentSubcategories, subcategory];

                return axios.patch(`http://localhost:4000/productstype/${categoryId}`, {
                    subcategory: updatedSubcategories
                });
            })
            .then(() => {
                setSubcategory("");
                setSuccess(true);
                setLoading(false);
                setTimeout(() => {
                    setSuccess(false);
                    props.addsubcategory(false);
                }, 1500);
            })
            .catch((err) => {
                setError("Failed to add subcategory. Please try again.");
                setLoading(false);
            });
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                    onClick={() => props.addsubcategory(false)}
                >
                    <VscChromeClose className="text-2xl" />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Add Subcategory
                    </h2>
                    <p className="text-sm text-gray-600">
                        Add a new subcategory for <span className="font-semibold capitalize">{props.type}</span>
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-3 mb-4 rounded-lg flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span className="font-semibold">Subcategory added successfully!</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-lg">
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {/* Input Field */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subcategory Name
                    </label>
                    <input
                        type="text"
                        value={subcategory}
                        onChange={(e) => {
                            setSubcategory(e.target.value);
                            setError("");
                        }}
                        placeholder="Enter subcategory name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition outline-none"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleAddSubcategory();
                            }
                        }}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={() => props.addsubcategory(false)}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddSubcategory}
                        disabled={loading}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Adding...</span>
                            </>
                        ) : (
                            "Add Subcategory"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Addsubcategory;