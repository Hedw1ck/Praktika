import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FaFemale} from "react-icons/fa";
import {FaMale} from "react-icons/fa";
import {producttype, server} from '../../tools/routes.jsx';
import AddCategory from "./addCategory/addCategory.jsx";
import Addsubcategory from "./addCategory/addsubcategory.jsx";

const Products = () => {
    const [product, setProduct] = useState([]);
    const [setcategory, setCategory] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedType, setSelectedType] = useState("All");
    const [addCategory, setAddCategory] = useState(false);
    const [addsubcategory, setAddsubcategory] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState("All");

    useEffect(() => {
        axios.get(server).then((res) => {
            setProduct(res.data);
            setFilteredProducts(res.data);
        });
        axios.get(producttype).then((res) => {
            setCategory(res.data);
        })
    }, []);

    useEffect(() => {
        let filtered = product;

        if (selectedGender) {
            filtered = filtered.filter(p => p.gender === selectedGender);
        }
        if (selectedType !== "All") {
            filtered = filtered.filter(p => p.type === selectedType);
        }
        if (selectedSubcategory !== "All") {
            filtered = filtered.filter(p =>
                p.subcategory && p.subcategory.includes(selectedSubcategory)
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

    // Delete subcategory ֆունկցիա
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

            // Վերաբեռնել categories-ը
            const res = await axios.get(producttype);
            setCategory(res.data);

            // Եթե ջնջված subcategory-ն ընտրված էր, reset անել
            if (selectedSubcategory === subcategoryToDelete) {
                setSelectedSubcategory("All");
            }

        } catch (error) {
            console.error('Error deleting subcategory:', error);
        }
    };

    return (
        // YNDHANUR PRODUCTI TYPE EV GENDERI YNDTRUM EV PRODUCTI TYPE I AVELACUM

        <div className={`h-[85vh]  w-full`}>
            <div className={`h-[15%]  w-full mb-10 relative  `}>
                <div className={'h-[70%]  w-full bg-[#E5E5E5]   flex items-between'}>
                    <div className={'flex flex-col h-full  w-[5%] justify-center items-center gap-[5%]'}>
                        <button onClick={() => filterByGender("female")}
                                className={`rounded-xl h-full w-[90%] shadow-xl flex items-center cursor-pointer justify-center ${selectedGender === "female" ? "bg-pink-300 text-pink-600" : "bg-white text-[#939393]"}`}>
                            <FaFemale
                                className={`text-2xl   `}/>
                        </button>
                        <button onClick={() => filterByGender("male")}
                                className={`rounded-xl h-full w-[90%] shadow-xl flex items-center  cursor-pointer justify-center ${selectedGender === "male" ? "bg-blue-300 text-blue-600" : "bg-white text-[#939393]"}`}>
                            <FaMale
                                className={`text-2xl `}/>
                        </button>
                    </div>
                    <div className={`h-full  w-[95%]  flex gap-2 `}>
                        <div onClick={resetFilters} className={` rounded-xl cursor-pointer  h-full w-[10%]   bg-[#FFFFFF]`}>All</div>
                        <div className={`flex justify-between h-full w-[83%] gap-2 overflow-x-auto `}>
                        {
                            setcategory.map((p) => (
                                <div key={p.id}
                                     onClick={() => filterByType(p.type)}
                                     className={`${selectedType === p.type ? "shadow-[0px_1px_10px_14px_rgba(245,233,233,1)]" : "shadow-none"} rounded-xl bg-white cursor-pointer h-full  min-w-[140px] flex flex-col justify-center  items-center`}>
                                    <img src={p.images} className={` h-[70%]  w-[40%] `} alt=""/>
                                    <p className={`text-[#2E2E2E]  font-montserrat font-medium text-xs leading-none capitalize`}>{p.type}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setAddCategory(!addCategory)}
                                className={`rounded-xl h-full w-[7%]  bg-[#FFFFFF] cursor-pointer hover:bg-[#939393]`}>+
                        </button>
                    </div>
                </div>

                {/*SUBCATEGORY NER EV DRANC AVELACUM*/}

                <div className='h-[40%]  flex  items-end   relative'>
                    {
                        setcategory
                            .find(cat => cat.type === selectedType)?.subcategory
                            ?.map((sub, i) => (
                                <div key={i} className="relative group">
                                    <div
                                        onClick={() => setSelectedSubcategory(sub)}
                                        className={`${selectedSubcategory === sub ? "border-blue-300" : "border-white"} 
                                            h-[90%] px-3 flex items-end cursor-pointer border-b-3 relative`}
                                    >
                                        <p>{sub}</p>
                                    </div>
                                    {/*//SUBCATEGORY-NERI JNJUM*/}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteSubcategory(sub);
                                        }}
                                        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                                   bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                                        title="Delete subcategory"
                                    >×</button>
                                </div>
                            ))
                    }
                    {
                      selectedType !=="All" && <button className={`h-[70%] w-[5%] ml-[2%] border-1`} onClick={() => setAddsubcategory(!addsubcategory)}>+</button>
                    }
                    {
                        addsubcategory &&  <Addsubcategory type={selectedType} addsubcategory={setAddsubcategory} />
                    }
                </div>
                {
                    addCategory && <AddCategory display={setAddCategory}/>
                }
            </div>

            <div className={` w-full h-[79%] flex flex-wrap overflow-y-auto gap-2 `}>
                {/*Pradukti avelacum */}
                {
                    filteredProducts.map((p) => (
                        <div key={p.id} className={`h-[170px] w-[194px] bg-white flex flex-col items-center justify-center `}>
                            <img src={p.image} className='h-[80%] w-[89%] rounded-t-xl' alt=""/>
                            <div className='flex h-[10%] w-[89%] items-center justify-between '>
                                <span
                                    className='font-montserrat font-medium text-[14px] leading-[100%] capitalize text-[#2E2E2E]'>{p.article}</span>
                                <span
                                    className='font-[Montserrat] font-semibold text-[14px] leading-[100%] capitalize text-[#1F1617]'>{p.price}$</span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Products;