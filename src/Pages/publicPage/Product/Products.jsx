import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFemale, FaMale, FaTrash } from "react-icons/fa";
import { ABOUT_PRODUCT, producttype, server } from '../../../tools/routes.jsx';
import AddCategory from "../addCategory/addCategory.jsx";
import Addsubcategory from "../addCategory/addsubcategory.jsx";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute cursor-pointer -left-3 z-10 top-1/2 -translate-y-1/2 shadow-md w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition bg-white"
    >
        <ChevronLeft size={24} />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute cursor-pointer z-10 -right-3 top-1/2 -translate-y-1/2 shadow-md w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition bg-white"
    >
        <ChevronRight size={24} />
    </button>
);

const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 2,
    infinite: false,
    speed: 400,
    swipeToSlide: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 4 }
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 3 }
        },
        {
            breakpoint: 480,
            settings: { slidesToShow: 2 }
        }
    ]
};

const Products = () => {
    const [product, setProduct] = useState([]);
    const [setcategory, setCategory] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedType, setSelectedType] = useState("All");
    const [addCategory, setAddCategory] = useState(false);
    const [addsubcategory, setAddsubcategory] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState("All");
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`${ABOUT_PRODUCT}/${productId}`);
    };

    useEffect(() => {
        axios.get(server).then((res) => {
            setProduct(res.data);
            setFilteredProducts(res.data);
        });
        axios.get(producttype).then((res) => {
            setCategory(res.data);
        });
    }, []);

    useEffect(() => {
        let filtered = product;

        if (selectedGender) {
            filtered = filtered.filter((p) => p.gender === selectedGender);
        }
        if (selectedType !== "All") {
            filtered = filtered.filter((p) => p.type === selectedType);
        }
        if (selectedSubcategory !== "All") {
            filtered = filtered.filter(
                (p) => p.subcategory && p.subcategory.includes(selectedSubcategory)
            );
        }
        setFilteredProducts(filtered);
    }, [selectedGender, selectedType, selectedSubcategory, product]);

    function filterByGender(gender) {
        setSelectedGender(gender);
    }
    function filterByType(type) {
        setSelectedType(type);
    }
    function resetFilters() {
        setSelectedGender(null);
        setSelectedType("All");
        setSelectedSubcategory("All");
    }

    const deleteSubcategory = async (subcategoryToDelete) => {
        if (!selectedType || selectedType === "All") return;

        try {
            const currentCategory = setcategory.find(cat => cat.type === selectedType);
            if (!currentCategory) return;

            const updatedSubcategories = currentCategory.subcategory.filter(
                sub => sub !== subcategoryToDelete
            );

            await axios.patch(`http://localhost:4000/productstype/${currentCategory.id}`, {
                subcategory: updatedSubcategories
            });

            const res = await axios.get(producttype);
            setCategory(res.data);

            if (selectedSubcategory === subcategoryToDelete) {
                setSelectedSubcategory("All");
            }

        } catch (error) {
            console.error('Error deleting subcategory:', error);
        }
    };

    const handleDeleteProduct = async (productId, productArticle) => {
        try {
            await axios.delete(`${server}/${productId}`);
            
            // Update local state
            setProduct(product.filter(p => p.id !== productId));
            setFilteredProducts(filteredProducts.filter(p => p.id !== productId));
            
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#F5F6FB]  overflow-hidden">
            {/* FILTER HEADER */}
            <div className="w-full mb-10 relative px-2 md:px-4">
                {/* Filter Header */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full">
                    {/* Gender Buttons */}
                    <div className="flex md:flex-col flex-row items-center justify-center gap-3 md:gap-4 w-full md:w-[5%]">
                        <button
                            onClick={() => filterByGender("female")}
                            className={`flex items-center justify-center rounded-xl shadow-md cursor-pointer transition-all duration-200 
          ${selectedGender === "female" ? "bg-pink-200 text-pink-600 scale-105" : "bg-white text-gray-400 hover:bg-pink-100" } 
          w-12 h-12 md:w-[90%] md:h-12`}
                        >
                            <FaFemale className="text-xl md:text-2xl" />
                        </button>

                        <button
                            onClick={() => filterByGender("male")}
                            className={`flex items-center justify-center rounded-xl shadow-md cursor-pointer transition-all duration-200 
          ${selectedGender === "male" ? "bg-blue-200 text-blue-600 scale-105" : "bg-white text-gray-400 hover:bg-blue-100"} 
          w-12 h-12 md:w-[90%] md:h-12`}
                        >
                            <FaMale className="text-xl md:text-2xl" />
                        </button>
                    </div>

                    {/* Category Slider + All Button */}
                    <div className="flex flex-1 flex-col md:flex-row items-center gap-3 md:gap-4 w-full md:w-[95%]">
                        <div
                            onClick={resetFilters}
                            className="flex items-center justify-center rounded-xl bg-white h-12 md:h-full w-full md:w-[10%] shadow-sm cursor-pointer hover:bg-gray-100 transition"
                        >
                            All
                        </div>

                        <div className="relative w-full md:w-[83%] overflow-x-hidden rounded-xl">
                            <Slider {...sliderSettings}>
                                {setcategory.map((p) => (
                                    <div key={p.id} className="px-2 py-1">
                                        <div
                                            onClick={() => filterByType(p.type)}
                                            className={`flex flex-col justify-center items-center cursor-pointer h-[100px] rounded-xl transition-all duration-200 
                  ${selectedType === p.type ? "shadow-inner shadow-pink-300 scale-105" : "bg-white hover:shadow-md"}`}
                                        >
                                            <img src={p.images} className="h-[70%] w-[40%] object-contain" alt={p.type} />
                                            <p className="text-xs md:text-sm font-medium text-gray-800 mt-1 capitalize">{p.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {token === "Admin" && (
                            <button
                                onClick={() => setAddCategory(!addCategory)}
                                className="flex items-center justify-center w-10 h-10 md:w-[7%] md:h-full rounded-xl bg-white shadow-sm cursor-pointer hover:bg-gray-200 transition"
                            >
                                +
                            </button>
                        )}
                    </div>
                </div>

                {/* Subcategories */}
                <div className="flex flex-wrap gap-2 md:gap-3 mt-4 justify-center md:justify-start">
                    {setcategory.find(cat => cat.type === selectedType)?.subcategory?.map((sub, i) => (
                        <div key={i} className="relative group">
                            <div
                                onClick={() => setSelectedSubcategory(sub)}
                                className={`px-3 py-1 border-b-2 cursor-pointer transition-all duration-200 
            ${selectedSubcategory === sub ? "border-blue-400 text-blue-600 font-semibold" : "border-gray-200 text-gray-600 hover:text-blue-500"}`}
                            >
                                {sub}
                            </div>

                            {token === "Admin" &&
                                <button
                                    onClick={(e) => { e.stopPropagation(); deleteSubcategory(sub); }}
                                    className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs text-white bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"
                                >
                                    ×
                                </button>
                            }
                        </div>
                    ))}

                    {selectedType !== "All" && token === "Admin" && (
                        <button
                            className="flex items-center justify-center w-8 h-8 border rounded-md hover:bg-gray-300 transition"
                            onClick={() => setAddsubcategory(!addsubcategory)}
                        >
                            +
                        </button>
                    )}

                    {addsubcategory && <Addsubcategory type={selectedType} addsubcategory={setAddsubcategory} />}
                </div>

                {addCategory && <AddCategory display={setAddCategory} />}
            </div>


            {/* PRODUCT GRID */}
            <div className="w-full flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 md:gap-5 px-3 md:px-6">
                {filteredProducts.map((p) => (
                    <div
                        key={p.id}
                        className="h-[170px] w-[46%] sm:w-[31%] md:w-[194px] bg-white rounded-xl shadow-md hover:shadow-lg transition relative group"
                    >
                        <div
                            onClick={() => handleProductClick(p.id)}
                            className="cursor-pointer h-full flex flex-col items-center justify-center"
                        >
                            <img src={p.image} className="h-[80%] w-[89%] rounded-t-xl object-cover" alt={p.article} />
                            <div className="flex h-[10%] w-[89%] items-center justify-between">
                                <span className="font-montserrat font-medium text-[14px] capitalize text-[#2E2E2E]">
                                    {p.article}
                                </span>
                                <span className="font-semibold text-[14px] text-[#1F1617]">{p.price}$</span>
                            </div>
                        </div>
                        
                        {/* Delete Button - Only for Admin */}
                        {token === "Admin" && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirm({
                                        id: p.id,
                                        article: p.article
                                    });
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg z-10"
                                title="Delete Product"
                            >
                                <FaTrash className="text-xs" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete product <span className="font-semibold">{deleteConfirm.article}</span>?
                            <br />
                            <span className="text-sm text-red-600 mt-2 block">This action cannot be undone.</span>
                        </p>
                        
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(deleteConfirm.id, deleteConfirm.article)}
                                className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <MdDelete />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
