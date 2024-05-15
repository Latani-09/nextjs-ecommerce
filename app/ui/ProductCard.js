"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {actions} from "../redux/cart.slice";
export default function ProductCard(product) {
  const dispatch=useDispatch();
  useEffect(() => {
    console.log("received in product card ", product.product);
  }, []);
  return (
    <div className="col-span-1  h-auto text-cyan-950 border-2 overflow-y-auto m-2 bg-white bg-opacity-80 rounded-md">
      <div className="flex flex-col   ">
        <div >
          <h1 className="h-10 font-bold text-center text-md w-full">
            {product.product.title}
          </h1>
        </div>
        <div className="h-40 w-full bg-contain bg-no-repeat " style={{backgroundImage:`url(${product.product.image_urls[0]})`}} ></div>
        <div className="h-8 mb-0 mt-auto">
          <p>USD.{product.product.price}</p>
        </div>
        <div className="h-8 mb-0 mt-auto">
          <button className=" text-white bg-cyan-950 w-full h-full" onClick={()=>dispatch(actions.addtoCart(product))}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
