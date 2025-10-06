import AddProduct from "../Pages/publicPage/AddProduct/AddProduct.jsx";
import Products from "../Pages/publicPage/Products.jsx";
import { Navigate } from "react-router-dom";

export const server = "http://localhost:4000/products"
export const producttype = "http://localhost:4000/productstype"

export const ADD_PRODUCTS = "/addProducts"
export const PRODUCTS = "/products"

export const PUBLIC = [
    { path: ADD_PRODUCTS, element: <AddProduct />, name: "ADD_PRODUCTS" },
    {path:PRODUCTS, element: <Products />, name: "PRODUCTS" },
    { path: "*", element: <Navigate to={PRODUCTS} />,  }
]