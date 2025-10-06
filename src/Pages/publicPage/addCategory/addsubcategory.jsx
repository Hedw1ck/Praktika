import React from 'react';
import axios from "axios";

const Addsubcategory = (props) => {
    props.type == "All" && props.addsubcategory(false)
    const [subcategory, setSubcategory] = React.useState("");

    function handleAddSubcategory() {
        axios.get(`http://localhost:4000/productstype/?type=${props.type}`).then((response) => {
            const categoryId = response.data[0].id;
            const currentData = response.data[0];
            const currentSubcategories = currentData.subcategory || [];
            const updatedSubcategories = [...currentSubcategories, subcategory];

            axios.patch(`http://localhost:4000/productstype/${categoryId}`, {
                subcategory: updatedSubcategories
            })
        })
        setSubcategory("")
    }
    return (
        <div className={`absolute h-[250%] w-[30%]  p-2 right-0 top-[110%] bg-white items-center flex flex-col gap-2`}>
            <div className={`flex  h-[30%] justify-between w-full `}>
                <h1>{props.type}: Add Subcategory</h1>
                <button className={`h-[90%]  w-[10%] cursor-pointer`}
                        onClick={() => props.addsubcategory(false)}>X
                </button>
            </div>
            <input
                onChange={(e) => setSubcategory(e.target.value)}
                className={`w-full border-b-1 h-[30%] `}
                type="text"/>
            <button onClick={() => handleAddSubcategory()}
                    className={`h-[40%]  bg-[#0008C1] rounded-xl text-white w-[30%]`}>Add
            </button>
        </div>
    );
};

export default Addsubcategory;