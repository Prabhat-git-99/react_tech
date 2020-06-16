import React from 'react';
import Info from '../components/AboutPage/info';
import Hero from '../components/Hero';
import AboutImg from '../images/aboutBcg.jpeg';

export default function AboutPage() {
    return (
        <>
            <Hero img={AboutImg}>
            </Hero>
            <Info></Info>
        </>
    )
}
