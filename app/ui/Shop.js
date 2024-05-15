'use client'
import ProductCard from "./ProductCard";

export default function Shop({products}){
    return (
     
        <div className="grid grid-cols-6 p-10 ">
        
        {products.length>0?(products.map((product,index)=>{
          return(
        <ProductCard product={product} key={product.id}/>)})):(null)}
      </div>
     
    )
}