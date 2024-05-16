"use client";
import Shop from "../ui/Shop";
import { getProducts } from "../actions/getProducts";
import { useEffect, useState } from "react";
import Cart from "./Cartpage/Cart";
export default function Page({ }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsfromServer = async () => {
      const response = await getProducts();
      if (response) {
        setProducts(response);
      }
    };
    getProductsfromServer();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
        {products.length > 0 ? (
          <Shop products={products}></Shop>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="col-span-1">
        <Cart/>
      </div>
      </div>

    </>
  );
}
