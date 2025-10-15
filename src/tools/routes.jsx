import AddProduct from "../Pages/publicPage/AddProduct/AddProduct.jsx";
import Products from "../Pages/publicPage/Product/Products.jsx";
import {Navigate} from "react-router-dom";
import AboutProduct from "../Pages/publicPage/Product/aboutProduct.jsx";
import AuthPage from "../Pages/AuthPage.jsx";
import About from "../Pages/publicPage/About/About.jsx";


const token = localStorage.getItem("token");
export const server = "http://localhost:4000/products"
export const producttype = "http://localhost:4000/productstype"

export const ADD_PRODUCTS = "/addProducts"
export const PRODUCTS = "/products"
export const  ABOUT_PRODUCT = "/product"
export const logReg ="/Login"
export const ABOUT= "/About"

export const PUBLIC = [
    {path:`${ABOUT_PRODUCT}/:productId`,element:<AboutProduct/>},
    { path: "*", element: <Navigate to={PRODUCTS} />,  },
    {path:PRODUCTS, element: <Products />, name: "Products" },
    {path:ABOUT,element:<About/>,name: "About"},
      token==="Admin" &&  { path: ADD_PRODUCTS, element: <AddProduct />, name: "ADD_PRODUCTS" }
]
export const login = [
    {path:logReg, element: <AuthPage/>},
    {path:"*",element: <Navigate to={logReg} />}
]
// console.log(token==="Admin")