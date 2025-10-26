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
            setError("Category name is required.")
        } else if (category[0] !== category[0].toUpperCase()) {
            setError("First letter must be capitalized.");
        } else if (images.length === 0) {
            setError("Please select an image.")
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
                props.display(false); // Close panel on success
            }).catch(err => {
                setError("Something went wrong. Please try again.");
            });
        }
    }

    const onChange = (imageList) => {
        setImages(imageList);
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
            <div className={`relative bg-white rounded-lg shadow-2xl p-6 w-11/12 md:w-1/2 lg:w-1/3 max-w-lg max-h-[90vh] overflow-y-auto`}>
                <div className={`flex justify-between items-center mb-4`}>
                    <span className={`text-xl font-semibold text-gray-800`}>Add Category</span>
                    <button className={`text-gray-500 hover:text-gray-800`} onClick={() => props.display(false)}>
                        <VscChromeClose className={`text-2xl`}/>
                    </button>
                </div>

                <div className={`grid grid-cols-2 gap-4 mb-4`}>
                    <button
                        onClick={() => setGender("female")}
                        className={`py-3 px-4 border rounded-lg flex items-center justify-center gap-3 transition-colors ${gender === "female" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 hover:bg-gray-200"}`}>
                        <FaFemale className={`text-xl`}/>
                        <span>Female</span>
                    </button>
                    <button
                        onClick={() => setGender("male")}
                        className={`py-3 px-4 border rounded-lg flex items-center justify-center gap-3 transition-colors ${gender === "male" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 hover:bg-gray-200"}`}>
                        <FaMale className={`text-xl`}/>
                        <span>Male</span>
                    </button>
                </div>

                <input
                    type="text"
                    value={category}
                    className={`w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500`}
                    placeholder="Category Name (e.g., Rings)"
                    onChange={(e) => setCategory(e.target.value)}
                />

                {error && <p className={`text-red-500 text-sm mb-4`}>{error}</p>}

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
                        <div className="w-full">
                            <div
                                className={`h-64 w-full flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                {imageList.length === 0 ? (
                                    <div className="text-center text-gray-500">
                                        <img
                                            className={`h-24 w-24 mx-auto mb-2 opacity-50`} // Adjusted size and opacity
                                            src="src/Pages/publicPage/addCategory/addCategoryImages/imageupload.jpg"
                                            alt="Upload placeholder"
                                        />
                                        <p>Click or drag to upload</p>
                                    </div>
                                ) : (
                                    <div className="relative h-full w-full p-2">
                                        <img
                                            src={imageList[0].data_url}
                                            className="h-full w-full object-contain rounded-md"
                                            alt="Category Preview"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onImageRemove(0);
                                            }}
                                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 shadow-md hover:bg-red-700 transition-transform transform hover:scale-110"
                                        >
                                            <VscChromeClose className="text-base"/>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </ImageUploading>
                <button
                    onClick={addCategory}
                    className={`w-full py-3 mt-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors`}>
                    Submit Category
                </button>
            </div>
        </div>
    );
};

export default AddCategory;