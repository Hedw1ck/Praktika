import React, { useEffect, useState } from "react";
import axios from "axios";
import { producttype, server } from "../../../tools/routes.jsx";
import ImageUploading from "react-images-uploading";
import { FaFemale, FaMale } from "react-icons/fa";

const AddProduct = () => {
    const [productsType, setProductsType] = useState([]);
    const [addProductsType, setAddProductsType] = useState("");
    const [gender, setGender] = useState("female");
    const [subcategory, setSubcategory] = useState("");
    const [subcategorys, setSubcategorys] = useState([]);
    const [articles, setArticles] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");

    const [images, setImages] = useState([]);
    const onChange = (imageList) => {
        setImages(imageList);
    };

    useEffect(() => {
        axios.get(producttype).then((response) => {
            setProductsType(response.data);
        });
    }, []);

    function AddProductsTypeFn(products) {
        setAddProductsType(products.type);
        setSubcategorys(products.subcategory);
    }

    function AddProducts() {
        if (addProductsType === "") {
            setError("Please select a product");
        } else if (gender === "") {
            setError("Please select a gender");
        } else if (images.length === 0) {
            setError("Please select an image");
        } else if (articles === "") {
            setError("Please add an article");
        } else if (price === "") {
            setError("Please add a price");
        } else {
            axios
                .post(server, {
                    gender: gender,
                    subcategory: subcategory,
                    price: price,
                    image: images[0].data_url,
                    article: articles,
                    type: addProductsType,
                })
                .then(() => {
                    setPrice("");
                    setArticles("");
                    setImages([]);
                    setError("");
                });
        }
    }

    return (
        <div className="min-h-[calc(90vh-80px)] w-full bg-[#B9BEDB] p-3 md:p-5">
            <div className="h-full w-full">
                <h1 className="text-lg md:text-2xl font-bold mb-2">Add Products</h1>

                {/* Gender + Type */}
                <div className="flex flex-col md:flex-row h-auto md:h-[15%] w-full gap-4">
                    {/* Gender */}
                    <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-4">
                        <button
                            onClick={() => setGender("female")}
                            className={`${
                                gender === "female"
                                    ? "text-pink-600 bg-pink-300"
                                    : "text-[#4F4F4F] bg-white"
                            } cursor-pointer flex items-center justify-center h-10 w-10 md:h-[40%] md:w-[90%] shadow-xl rounded-xl`}
                        >
                            <FaFemale className="text-xl md:text-2xl" />
                        </button>
                        <button
                            onClick={() => setGender("male")}
                            className={`${
                                gender === "male"
                                    ? "text-blue-600 bg-blue-300"
                                    : "text-[#4F4F4F] bg-white"
                            } cursor-pointer flex items-center justify-center h-10 w-10 md:h-[40%] md:w-[90%] shadow-xl rounded-xl`}
                        >
                            <FaMale className="text-xl md:text-2xl" />
                        </button>
                    </div>

                    {/* Product Type */}
                    <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-3 md:gap-4 w-full">
                        {productsType.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => AddProductsTypeFn(product)}
                                className={`${
                                    addProductsType === product.type
                                        ? "shadow-[inset_0px_0px_20px_rgba(232,152,218,0.49)]"
                                        : "shadow-none"
                                } cursor-pointer min-w-[100px] md:min-w-[120px] rounded-xl bg-white flex flex-col items-center p-2`}
                            >
                                <img
                                    className="h-[60px] md:h-[70%] w-[40%]"
                                    src={product.images}
                                    alt=""
                                />
                                <span className="text-sm md:text-base">{product.type}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subcategory */}
                <div className="flex flex-wrap gap-2 mt-4 border-t border-gray-300 pt-2">
                    {subcategorys.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSubcategory(item)}
                            className={`${
                                subcategory === item ? "border-blue-400" : "border-transparent"
                            } cursor-pointer border-b-2 p-1 text-sm md:text-base font-montserrat font-medium capitalize`}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                {/* Bottom Section (Image + Inputs) */}
                <div className="flex flex-col md:flex-row mt-4 gap-4 md:gap-6">
                    {/* Image */}
                    <div className="h-64 md:h-full md:w-[30%] bg-white rounded-xl overflow-hidden">
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
                                            className="h-full w-full flex items-center justify-center cursor-pointer"
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            <img
                                                style={isDragging ? { opacity: 0.7 } : undefined}
                                                className="h-2/3 object-contain"
                                                src="src/Pages/publicPage/addCategory/addCategoryImages/imageupload.jpg"
                                                alt="Upload"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center">
                                            {imageList.map((image, index) => (
                                                <img
                                                    key={index}
                                                    onClick={() => onImageUpdate(index)}
                                                    src={image["data_url"]}
                                                    alt={`Uploaded ${index}`}
                                                    className="max-h-full max-w-full cursor-pointer"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </ImageUploading>
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 bg-white rounded-xl p-4 flex flex-col justify-between">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 flex flex-col">
                                <span>Article</span>
                                <input
                                    value={articles}
                                    onChange={(e) => setArticles(e.target.value)}
                                    className="border-b-2 h-[40px] w-full"
                                    type="text"
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <span>Price</span>
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="border-b-2 h-[40px] w-full"
                                    type="number"
                                />
                            </div>
                        </div>
                        <p className="text-red-600 text-sm md:text-lg mt-2">{error}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => AddProducts()}
                                type="submit"
                                className="w-full md:w-[30%] bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded border-b-4 border-blue-700 hover:border-blue-500"
                            >
                                Add product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
