import {React, useState} from 'react';
import {VscChromeClose} from "react-icons/vsc";
import {FaFemale} from "react-icons/fa";
import {FaMale} from "react-icons/fa";
import axios from "axios";
import {producttype} from "../../../tools/routes.jsx";
import ImageUploading from 'react-images-uploading';

const AddCategory = (props) => {

    const [gender, setGender] = useState("female");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);

    function addCategory() {
        if (category === "") {
            setError("Is empty")
        } else if (category[0] !== category[0].toUpperCase()) {
            setError("First letter must be capitalized");
        } else if (images.length === 0) {
            setError("Select image")
        } else {
            axios.post(producttype, {
                gender: gender,
                type: category,
                images: images[0].data_url,
                subcategory: [],
            }).then(() => {
                setCategory("")
                setError("")
                setImages([])
            });
        }
    }

    const onChange = (imageList) => {
        setImages(imageList);
    };

    return (
        <div className={`absolute h-[300%] w-[30%] p-2 bg-white right-[10%] top-[60%]`}>
            <div className={`h-[9%] w-full flex justify-between`}>
                <span
                    className={`text-[#2E2E2E] font-montserrat font-semibold text-base leading-none tracking-normal capitalize`}>
                    Add Category
                </span>
                <button className={`h-full w-[10%] cursor-pointer text-[#C3C3C3] hover:text-[#939393]`}
                        onClick={() => props.display(false)}>
                    <VscChromeClose className={`text-xl`}/>
                </button>
            </div>

            <div className={`h-[9%] w-full flex gap-2`}>
                <button
                    onClick={() => setGender("female")}
                    className={`cursor-pointer h-full w-[50%] border-1 rounded-xl flex items-center justify-center gap-5 font-roboto font-normal text-sm leading-none capitalize text-[#4F4F4F]`}>
                    <FaFemale
                        className={`h-full text-2xl ${gender === "female" ? "text-[#0008C1]" : "text-[#4F4F4F]"} `}/>
                    Female
                </button>
                <button
                    onClick={() => setGender("male")}
                    className={`cursor-pointer h-full w-[50%] border-1 rounded-xl flex items-center justify-center gap-5 font-roboto font-normal text-sm leading-none capitalize text-[#4F4F4F]`}>
                    <FaMale className={`h-full text-2xl ${gender === "male" ? "text-[#0008C1]" : "text-[#4F4F4F]"} `}/>
                    Male
                </button>
            </div>

            <input
                type="text"
                value={category}
                className={`h-[9%] w-full border-b-2 mb-[2%]`}
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
            />

            {error && <p className={`text-red-600`}>{error}</p>}

            <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={1}
                dataURLKey="data_url"
                acceptType={['jpg', 'png', 'jpeg', 'gif']}
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemove,
                      dragProps,
                      isDragging
                  }) => (
                    <div className="h-[60%]">
                        <div
                            className={`h-full w-full flex items-center justify-center cursor-pointer ${isDragging ? 'border-2 border-blue-500' : ''}`}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            {imageList.length === 0 ? (
                                <img
                                    className={`max-h-full max-w-full cursor-pointer`}
                                    src="src/Pages/publicPage/addCategory/addCategoryImages/imageupload.jpg"
                                    alt="Upload placeholder"
                                />
                            ) : (
                                <div className="relative flex items-center justify-center  h-full w-full">
                                    <img
                                        src={imageList[0].data_url}
                                        className="max-h-full max-w-full object-contain"
                                        alt="Category"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onImageRemove(0);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <VscChromeClose className="text-sm"/>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </ImageUploading>
            <button
                onClick={addCategory}
                className={`cursor-pointer h-[10%] w-full border-1 bg-[#0008C1] rounded-xl text-white mt-4`}>
                Submit
            </button>
        </div>
    );
};

export default AddCategory;