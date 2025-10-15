import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {PRODUCTS, server} from "../../../tools/routes.jsx";
import { GoArrowLeft } from "react-icons/go";


const AboutProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${server}/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.log('Error fetching product:', error);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const goBack = useNavigate();
    return (
        <div className="h-[65vh] w-full ">
            <button
                onClick={()=>goBack(PRODUCTS)}
                className={`border-1 h-[70px] w-[70px] rounded-4xl flex items-center justify-center text-3xl hover:bg-pink-400 bg-pink-50 cursor-pointer text-pink-300`} >
                <GoArrowLeft />
            </button>
            <h1 className="text-2xl font-bold mb-4">About the product</h1>
                { product && (
                    <div className="h-full w-full bg-white p-4 ">
                        <img className="h-[60%] w-[40%] rounded-xl" src={product.image} alt=""/>
                        <p>Price: {product.price}$</p>
                        <p>Type: {product.type}</p>
                        <p>Subcategory: {product.subcategory}</p>
                        <p>Gender: {product.gender}</p>
                    </div>
                )
                }
        </div>
    );
};

export default AboutProduct;