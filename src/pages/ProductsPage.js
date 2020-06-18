import React from 'react';
import Products from '../components/ProductPage/Products';
import productsBCG from '../images/productsBcg.jpeg';
import Hero from '../components/Hero';

export default function ProductsPage() {
    return (
        <>
            <Hero img={productsBCG} />
            <Products />
        </>
    )
}
