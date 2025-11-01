import React, { useEffect, useState } from "react";
import axios from "axios";
import { producttype, server } from "../../../tools/routes.jsx";
import ImageUploading from "react-images-uploading";
import { FaFemale, FaMale, FaCheckCircle } from "react-icons/fa";

const AddProduct = () => {
    const [productsType, setProductsType] = useState([]);
    const [addProductsType, setAddProductsType] = useState("");
    const [gender, setGender] = useState("female");
    const [subcategory, setSubcategory] = useState("");
    const [subcategorys, setSubcategorys] = useState([]);
    const [articles, setArticles] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [images, setImages] = useState([]);
    const onChange = (imageList) => {
        setImages(imageList);
        if (error && error.includes("image")) setError("");
    };

    useEffect(() => {
        axios.get(producttype).then((response) => {
            setProductsType(response.data);
        });
    }, []);

    function AddProductsTypeFn(products) {
        setAddProductsType(products.type);
        setSubcategorys(products.subcategory);
        setError("");
    }

    function AddProducts() {
        setSuccess(false);
        setLoading(true);

        // Clear previous errors
        setError("");

        if (addProductsType === "") {
            setError("Please select a product type");
            setLoading(false);
            return;
        }
        
        if (images.length === 0) {
            setError("Please upload an image");
            setLoading(false);
            return;
        }
        
        if (articles === "") {
            setError("Please enter an article name");
            setLoading(false);
            return;
        }
        
        if (price === "" || isNaN(price) || Number(price) <= 0) {
            setError("Please enter a valid price");
            setLoading(false);
            return;
        }

        axios
            .post(server, {
                gender: gender,
                subcategory: subcategory,
                price: price,
                image: images[0].data_url,
                article: articles,
                type: addProductsType,
                description: description,
            })
            .then(() => {
                setPrice("");
                setArticles("");
                setDescription("");
                setImages([]);
                setSubcategory("");
                setError("");
                setSuccess(true);
                setLoading(false);
                
                // Reset success message after 3 seconds
                setTimeout(() => setSuccess(false), 3000);
            })
            .catch(() => {
                setError("Failed to add product. Please try again.");
                setLoading(false);
            });
    }

    return (
        <div className="min-h-[calc(90vh-80px)] w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-3 md:p-6">
            <div className="h-full w-full max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Add Products</h1>
                    <p className="text-sm text-gray-600">Create and add new products to your store</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg flex items-center gap-2 animate-pulse">
                        <FaCheckCircle className="text-green-500 text-xl" />
                        <span className="font-semibold">Product added successfully!</span>
                    </div>
                )}

                {/* Gender Selection */}
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Gender Selection</h2>
                    <div className="flex flex-row md:flex-col gap-3 md:gap-4">
                        <button
                            onClick={() => {
                                setGender("female");
                                setError("");
                            }}
                            className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-semibold ${
                                gender === "female"
                                    ? "bg-pink-200 text-pink-700 shadow-md scale-105"
                                    : "bg-gray-100 text-gray-600 hover:bg-pink-50"
                            } cursor-pointer`}
                        >
                            <FaFemale className="text-2xl" />
                            <span className="text-sm md:text-base">Female</span>
                        </button>
                        <button
                            onClick={() => {
                                setGender("male");
                                setError("");
                            }}
                            className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-semibold ${
                                gender === "male"
                                    ? "bg-blue-200 text-blue-700 shadow-md scale-105"
                                    : "bg-gray-100 text-gray-600 hover:bg-blue-50"
                            } cursor-pointer`}
                        >
                            <FaMale className="text-2xl" />
                            <span className="text-sm md:text-base">Male</span>
                        </button>
                    </div>
                </div>

                {/* Product Type Selection */}
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Product Type</h2>
                    <div className="overflow-x-auto">
                        <div className="flex gap-3 md:gap-4 pb-2 min-w-max">
                            {productsType.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => AddProductsTypeFn(product)}
                                    className={`cursor-pointer min-w-[100px] md:min-w-[120px] rounded-xl bg-white flex flex-col items-center justify-center p-3 transition-all duration-200 border-2 ${
                                        addProductsType === product.type
                                            ? "border-purple-500 shadow-[inset_0px_0px_20px_rgba(232,152,218,0.49)] scale-105"
                                            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                                    }`}
                                >
                                    <img
                                        className="h-[50px] md:h-[60px] w-auto object-contain mb-2"
                                        src={product.images}
                                        alt={product.type}
                                    />
                                    <span className="text-xs md:text-sm font-medium text-gray-800 capitalize">{product.type}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Subcategory Selection */}
                {subcategorys.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">Subcategory (Optional)</h2>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSubcategory("")}
                                className={`px-4 py-2 border-2 rounded-lg transition-all ${
                                    subcategory === ""
                                        ? "border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                                }`}
                            >
                                All
                            </button>
                            {subcategorys.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSubcategory(item)}
                                    className={`px-4 py-2 border-2 rounded-lg transition-all capitalize text-sm ${
                                        subcategory === item
                                            ? "border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                                            : "border-gray-300 text-gray-600 hover:border-gray-400"
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Image Upload & Product Details */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Image Upload */}
                    <div className="w-full lg:w-[350px] bg-white rounded-2xl shadow-xl p-4 md:p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Product Image</h2>
                        <div className="h-[300px] md:h-[400px] bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-300">
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={1}
                                dataURLKey="data_url"
                            >
                                {({
                                      imageList,
                                      onImageUpload,
                                      onImageUpdate,
                                      isDragging,
                                      dragProps,
                                  }) => (
                                    <div className="upload__image-wrapper h-full w-full">
                                        {imageList.length === 0 ? (
                                            <div
                                                className="h-full w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                <div className="text-center p-6">
                                                    <svg className="w-16 h-16 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-gray-600 font-medium mb-1">Click or drag to upload</p>
                                                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full w-full relative bg-white">
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="h-full w-full relative group">
                                                        <img
                                                            onClick={() => onImageUpdate(index)}
                                                            src={image["data_url"]}
                                                            alt={`Uploaded ${index}`}
                                                            className="h-full w-full object-contain cursor-pointer"
                                                        />
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setImages([]);
                                                            }}
                                                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-lg hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                    </div>

                    {/* Product Details Form */}
                    <div className="flex-1 bg-white rounded-2xl shadow-xl p-4 md:p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Product Details</h2>
                            <div className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Article Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        value={articles}
                                        onChange={(e) => {
                                            setArticles(e.target.value);
                                            if (error.includes("article")) setError("");
                                        }}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition outline-none"
                                        type="text"
                                        placeholder="Enter article name"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price ($) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        value={price}
                                        onChange={(e) => {
                                            setPrice(e.target.value);
                                            if (error.includes("price")) setError("");
                                        }}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition outline-none"
                                        type="number"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* Description Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Description <span className="text-gray-500 text-xs">(Optional)</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition outline-none resize-none"
                                    placeholder="Enter detailed description of the product..."
                                    rows="4"
                                />
                                <p className="text-xs text-gray-500 mt-1">Describe the product's features, materials, and specifications</p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">
                                    <p className="font-medium">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                                <button
                                    onClick={() => {
                                        setArticles("");
                                        setPrice("");
                                        setDescription("");
                                        setImages([]);
                                        setSubcategory("");
                                        setAddProductsType("");
                                        setError("");
                                    }}
                                    className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={AddProducts}
                                    disabled={loading}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Adding Product...</span>
                                        </>
                                    ) : (
                                        "Add Product"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
