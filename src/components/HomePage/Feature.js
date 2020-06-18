import React, { Component } from 'react';
import Product from '../Product';
import { Link } from 'react-router-dom';
import Title from '../Title';
import { ProductConsumer } from '../../context';


export default class Feature extends Component {
    render() {
        return (
            <section className='py-5'>
                <div className='container'>
                    {/* Title */}
                    <Title title='featured products' center='true' />
                    {/* Products */}
                    <div className='row py-5'>
                        <ProductConsumer>
                            {value => {
                                const { featuredProducts } = value;
                                return featuredProducts.map(product =>
                                    (<Product key={product.id} product={product}></Product>)
                                )
                            }}
                        </ProductConsumer>
                    </div>
                    <div className='row mt-5'>
                        <div className='col text-center'>
                            <Link to='/products' className='main-link'>Our product</Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
