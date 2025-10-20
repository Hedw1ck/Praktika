
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFemale, FaMale } from "react-icons/fa";
import { ABOUT_PRODUCT, producttype, server } from '../../../tools/routes.jsx';
import AddCategory from "../addCategory/addCategory.jsx";
import Addsubcategory from "../addCategory/addsubcategory.jsx";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PrevArrow = ({  onClick }) => (
    <button
        onClick={onClick}
        className="absolute cursor-pointer -left-3 z-1 top-1/2 -translate-y-1/2  shadow-md w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition"
    >
        <ChevronLeft size={30} />
    </button>
);

const NextArrow = ({  onClick }) => (
    <button
        onClick={onClick}
        className="absolute cursor-pointer z-1 -right-3 top-1/2 -translate-y-1/2  shadow-md w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition"
    >
        <ChevronRight size={30} />
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
            settings: { slidesToShow: 5 }
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

    return (
        <div className="h-[85vh] w-full">
            <div className="h-[15%] w-full mb-10 relative">
                <div className="h-[70%] w-full bg-[#E5E5E5] flex items-between relative">
                    <div className="flex flex-col h-full w-[5%] justify-center items-center gap-[5%]">
                        <button
                            onClick={() => filterByGender("female")}
                            className={`rounded-xl h-full w-[90%] shadow-xl flex items-center cursor-pointer justify-center ${selectedGender === "female" ? "bg-pink-300 text-pink-600" : "bg-white text-[#939393]"}`}
                        >
                            <FaFemale className="text-2xl" />
                        </button>
                        <button
                            onClick={() => filterByGender("male")}
                            className={`rounded-xl h-full w-[90%] shadow-xl flex items-center cursor-pointer justify-center ${selectedGender === "male" ? "bg-blue-300 text-blue-600" : "bg-white text-[#939393]"}`}
                        >
                            <FaMale className="text-2xl" />
                        </button>
                    </div>

                    <div className="h-full w-[95%] flex gap-2 items-center relative">
                        <div onClick={resetFilters} className="rounded-xl cursor-pointer h-full w-[10%] flex items-center justify-center bg-[#FFFFFF]">
                            All
                        </div>

                        <div className="relative w-[83%]">
                            <Slider {...sliderSettings}>
                                {setcategory.map((p) => (
                                    <div key={p.id} className="px-2">
                                        <div
                                            onClick={() => filterByType(p.type)}
                                            className={`${selectedType === p.type ? "shadow-[1px_-31px_38px_9px_rgba(232,152,218,0.49)_inset]" : "shadow-none"} rounded-xl bg-white cursor-pointer h-[100px] flex flex-col justify-center items-center`}
                                        >
                                            <img src={p.images} className="h-[70%] w-[40%]" alt="" />
                                            <p className="text-[#2E2E2E] font-montserrat font-medium text-xs leading-none capitalize">
                                                {p.type}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {token === "Admin" && (
                            <button
                                onClick={() => setAddCategory(!addCategory)}
                                className="rounded-xl h-full w-[7%] bg-[#FFFFFF] cursor-pointer hover:bg-[#939393]"
                            >
                                +
                            </button>
                        )}
                    </div>
                </div>

                <div className="h-[40%] flex items-end relative">
                    {setcategory.find(cat => cat.type === selectedType)?.subcategory?.map((sub, i) => (
                        <div key={i} className="relative group">
                            <div
                                onClick={() => setSelectedSubcategory(sub)}
                                className={`${selectedSubcategory === sub ? "border-blue-300" : "border-white"} h-[90%] px-3 flex items-end cursor-pointer border-b-3 relative`}
                            >
                                <p>{sub}</p>
                            </div>
                            {   token === "Admin" &&
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteSubcategory(sub);
                                    }}
                                    className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                                >
                                    ×
                                </button>
                            }

                        </div>
                    ))}

                    {selectedType !== "All" && token === "Admin" && (
                        <button
                            className="h-[70%] w-[5%] ml-[2%] border-1 cursor-pointer hover:bg-gray-600"
                            onClick={() => setAddsubcategory(!addsubcategory)}
                        >
                            +
                        </button>
                    )}

                    {addsubcategory && <Addsubcategory type={selectedType} addsubcategory={setAddsubcategory} />}
                </div>

                {addCategory && <AddCategory display={setAddCategory} />}
            </div>

            <div className="w-full h-[79%] flex flex-wrap overflow-y-auto gap-2">
                {filteredProducts.map((p) => (
                    <div
                        onClick={() => handleProductClick(p.id)}
                        key={p.id}
                        className="h-[170px] w-[194px] cursor-pointer bg-white flex flex-col items-center justify-center"
                    >
                        <img src={p.image} className="h-[80%] w-[89%] rounded-t-xl" alt="" />
                        <div className="flex h-[10%] w-[89%] items-center justify-between">
                            <span className="font-montserrat font-medium text-[14px] capitalize text-[#2E2E2E]">
                                {p.article}
                            </span>
                            <span className="font-semibold text-[14px] text-[#1F1617]">{p.price}$</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
