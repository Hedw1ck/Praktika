import React, {useEffect, useState} from 'react';
import axios from "axios";
import {producttype, server} from "../../../tools/routes.jsx";
import ImageUploading from 'react-images-uploading';
import {FaFemale, FaMale} from "react-icons/fa";

const AddProduct = () => {
    const [productsType, setProductsType] = useState([]);
    const [addProductsType, setAddProductsType] = useState("");
    const [gender, setGender] = useState("female");
    const [subcategory, setSubcategory] = useState("");
    const [subcategorys, setSubcategorys] = useState([]);
    const [articles, setArticles] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");

    const [images, setImages] = React.useState([]);
    const onChange = (imageList) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);

        setImages(imageList);
    };

    useEffect(() => {
        axios.get(producttype).then((response) => {
            setProductsType(response.data);
        });
    }, []);

    function AddProductsType(products) {
        setAddProductsType(products.type)
        setSubcategorys(products.subcategory)
    }

    function AddProducts() {
        if(AddProductsType===""){
            setError("Please select a product");
        }else if(gender ===""){
            setError("Please select a gender");
        // }else if(subcategory===""){
        //     setError("Please select a subcategory");
        }else if(images.length === 0){
            setError("Please select a image");
        }else if(articles === ""){
            setError("Please select a article");
        }else if(price === ""){
            setError("Please select a price");
        }else{
        axios.post(server, {
            gender: gender,
            subcategory: subcategory,
            price: price,
            image: images[0].data_url,
            article: articles,
            type: addProductsType
        }).then(() => {
            setPrice("")
            setArticles("")
            setImages([])
            setError("")
        })}
    }
    // console.log(addProductsType);
    console.log(gender)
    // console.log(subcategorys)
    // console.log(articles)
    // console.log(price)
    // console.log(subcategory)

    return (
        <div className={`h-[80vh] w-full  bg-[#B9BEDB] p-5`}>
            <div className={`h-full w-full`}>
                <h1>Add Products</h1>
                <div className={`h-[15%] w-full  mt-2 flex`}>
                    {/*gender*/}
                    <div className={`h-full w-[5%] flex flex-col items-center justify-around`}>
                        <button
                            onClick={() => setGender("female")}
                            className={`${gender === "female" ? "text-pink-600 bg-pink-300" : "text-[#4F4F4F] bg-white "} cursor-pointer flex items-center justify-center h-[40%] w-[90%] shadow-xl rounded-xl`}>
                            <FaFemale className={`h-full text-2xl  `}/>
                        </button>
                        <button
                            onClick={() => setGender("male")}
                            className={`${gender === "male" ? "text-blue-600 bg-blue-300"  : "text-[#4F4F4F]  bg-white"} cursor-pointer  h-[40%] flex items-center justify-center w-[90%] shadow-xl rounded-xl`}>
                            <FaMale
                                className={`h-full text-2xl `}/>
                        </button>
                    </div>
                    {/*gender*/}

                    {/*type*/}
                    <div
                        className={`h-full w-[95%]  gap-4 flex justify-between items-center overflow-x-auto  `}>
                        {
                            productsType.map(product => (
                                <div
                                    onClick={() => AddProductsType(product)}
                                    key={product.id}
                                    className={`${addProductsType === product.type ? "shadow-[0px_1px_10px_14px_rgba(245,233,233,1)]" : "shadow-none"} cursor-pointer min-w-[120px] rounded-xl bg-white h-[90%]  flex flex-col items-center  `}>
                                    <img className={`h-[70%] w-[40%] `} src={product.images} alt=""/>
                                    <span>{product.type}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/*type*/}

                {/*subcategory*/}
                <div className={`h-[7%]  w-full  flex items-end`}>
                    {
                        subcategorys.map(item => (
                            <div
                                onClick={() => setSubcategory(item)}
                                key={item.id}
                                className={`${subcategory === item ? "border-blue-400" : "border-white"} cursor-pointer border-b-3    p-2 font-montserrat font-medium text-[14px] leading-[100%] capitalize`}>
                                {item}
                            </div>
                        ))
                    }
                </div>
                {/*subcategory*/}

                <div className={`h-[60%] w-full  flex mt-4 `}>

                    <div className={`h-full w-[30%]  bg-white`}>
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
                                                style={isDragging ? {opacity: 0.7} : undefined}
                                                className="h-full w-full object-contain"
                                                src="src/Pages/publicPage/addCategory/addCategoryImages/imageupload.jpg"
                                                alt="Upload"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-full w-full ">
                                            {imageList.map((image, index) => (
                                                <div key={index}
                                                     className="h-full w-full flex items-center justify-center">
                                                    <img
                                                        className="max-h-full max-w-full cursor-pointer"
                                                        onClick={() => onImageUpdate(index)}
                                                        src={image['data_url']}
                                                        alt={`Uploaded ${index}`}/>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </ImageUploading>
                    </div>


                    <div
                        className={`h-full w-[70%] flex flex-col justify-between p-4 text-[#1F1617] font-montserrat font-medium text-base leading-none capitalize`}>
                        <div className={`w-full h-[50%]  flex `}>
                            <div className={`h-full w-[50%]  flex flex-col `}>
                                <span>Article</span>
                                <input
                                    value={articles}
                                    onChange={(e) => setArticles(e.target.value)}
                                    className={`border-b-2 h-[20%] w-[90%]`}
                                    type="text"/>
                            </div>
                            <div className={`h-full w-[50%] flex flex-col `}>
                                <span>Price</span>
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className={`border-b-2 h-[20%] w-[90%]`}
                                    type="number"/>
                            </div>
                        </div>
                        <p className={`text-red-600 text-xl`}>{error}</p>
                        <div className={`h-[10%] w-full flex justify-end`}>
                            <button
                                onClick={() => AddProducts()}
                                type="submit"
                                className={`w-[30%] h-full cursor-pointer bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" `}>Add product
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default AddProduct;