import React from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/HomePage/Service';
import Features from '../components/HomePage/Feature';

export default function Home() {
    return (
    <>
        <Hero title='awesome gadget' max='true'>
            <Link to='/' className='main-link' style={{margin:'2rem'}}>our product</Link>
        </Hero>
        <Services />
        <Features />
    </>
    );
}
