import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import singleProductImg from '../images/singleProductBcg.jpeg';
import { ProductConsumer } from '../context';

export default function SingleProduct() {
    return (
        <>
            <Hero img={singleProductImg} title='single Product' />
            <ProductConsumer>
                {value => {
                    const { singleProduct,addToCart,loading } = value;
                    if(loading){
                        console.log('hello from loading');
                        return <h1>Product Loading...</h1>
                    }
                    const {company, description, id, price, title, image} = singleProduct;
                return (<h3>{title}</h3>);
                }}
            </ProductConsumer>
        </>
    )
}
