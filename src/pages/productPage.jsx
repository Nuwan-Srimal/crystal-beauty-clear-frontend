import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";

export function ProductPage(){

    const[products, setProducts] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(isLoading){
            axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
                (response)=>{
                    setProducts(response.data);
                    setIsLoading(false);
                }
            ).catch((error)=>{
                console.error("Error fetching products:", error);
                setIsLoading(false);
                toast.error("Failed to load products");
            });
        }
    },[isLoading])

    return(
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary">
            {
                isLoading? <Loader/>
                :
                <div className="w-full h-full flex flex-row flex-wrap justify-center bg-primary">
                    {
                        products.map((item)=>{
                            return(
                                <ProductCard key={item.productID} product={item}/>
                            )
                        })
                    }
                    {
                        products.map((item)=>{
                            return(
                                <ProductCard key={item.productID} product={item}/>
                            )
                        })
                    }
                    {
                        products.map((item)=>{
                            return(
                                <ProductCard key={item.productID} product={item}/>
                            )
                        })
                    }
                    {
                        products.map((item)=>{
                            return(
                                <ProductCard key={item.productID} product={item}/>
                            )
                        })
                    }
                    {
                        products.map((item)=>{
                            return(
                                <ProductCard key={item.productID} product={item}/>
                            )
                        })
                    }
                </div>  
            }
        </div>
    )
}