import React from 'react';
import { ProductConsumer } from '../context';

export default function Home() {
    return (
    <>
        <ProductConsumer>
            {value => {
                console.log(value);
                return(
                <h1>Hello from context</h1>
                )
            }}
        </ProductConsumer>
    </>
    );
}
