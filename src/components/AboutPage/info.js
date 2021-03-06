import React from 'react'
import Title from '../Title';
import aboutBcg from '../../images/aboutBcg.jpeg';

export default function info() {
    return (
        <section className='Py-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-10 mx-auto col-md-6 my-3'>
                        <img src={aboutBcg} className='img-fluid img-thumbnail' style={{background:'var(--darkGrey)'}}></img>
                    </div>
                    <div className='col-10 mx-auto col-md-6 my-3'>
                        <Title title='about-us' />
                        <p className='text-lead text-muted my-3'>jljh bvhjghj fchg yikn tyuyj fdt hk uygj dtfhgjhjh  tfb i trvhj ryfhgv tfjh dtst detb</p>
                        <p className='text-lead text-muted my-3'>jljh bvhjghj fchg yikn tyuyj fdt hk uygj dtfhgjhjh  tfb i trvhj ryfhgv tfjh dtst detb</p>
                        <button className='main-link' type='button' style={{marginTop:'2rem'}}>more info</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
