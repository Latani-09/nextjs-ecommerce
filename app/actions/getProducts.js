'use server'

import { fetchProducts } from "../lib/data"

export async function getProducts(){
    console.log('getting Products')
    const products= await fetchProducts();
    return products;
}