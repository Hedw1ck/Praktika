import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {PRODUCTS, server} from "../../../tools/routes.jsx";
import { GoArrowLeft } from "react-icons/go";
import { FaTag, FaVenus, FaMars, FaInfoCircle, FaShoppingCart } from "react-icons/fa";

const AboutProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${server}/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.log('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const goBack = useNavigate();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
                    <button
                        onClick={() => goBack(PRODUCTS)}
                        className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all"
                    >
                        Go Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => goBack(PRODUCTS)}
                    className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all text-gray-700 hover:text-purple-600 group"
                >
                    <GoArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Products</span>
                </button>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
                        {/* Left Side - Image */}
                        <div className="flex flex-col">
                            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-100 flex items-center justify-center group">
                                <img 
                                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" 
                                    src={product.image} 
                                    alt={product.article}
                                />
                            </div>
                        </div>

                        {/* Right Side - Details */}
                        <div className="flex flex-col justify-center space-y-6">
                            {/* Title */}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 capitalize">
                                    {product.article}
                                </h1>
                                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                                    ${product.price}
                                </p>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <FaTag className="text-purple-600" />
                                    <span className="text-sm font-semibold text-gray-600">Type:</span>
                                    <span className="text-sm font-medium text-gray-800 capitalize">{product.type}</span>
                                </div>

                                {product.subcategory && (
                                    <div className="flex items-center gap-3">
                                        <FaInfoCircle className="text-purple-600" />
                                        <span className="text-sm font-semibold text-gray-600">Subcategory:</span>
                                        <span className="text-sm font-medium text-gray-800 capitalize">{product.subcategory}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    {product.gender === "female" ? (
                                        <>
                                            <FaVenus className="text-pink-600" />
                                            <span className="text-sm font-semibold text-gray-600">Gender:</span>
                                            <span className="text-sm font-medium text-gray-800 capitalize">Female</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaMars className="text-blue-600" />
                                            <span className="text-sm font-semibold text-gray-600">Gender:</span>
                                            <span className="text-sm font-medium text-gray-800 capitalize">Male</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                        <FaInfoCircle className="text-purple-600" />
                                        Product Description
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    <FaShoppingCart />
                                    <span>Add to Cart</span>
                                </button>
                                <button className="flex-1 px-6 py-4 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-200">
                                    Contact Seller
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutProduct;