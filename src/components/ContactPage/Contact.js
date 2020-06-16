import React from 'react';
import Title from '../Title';

export default function Contact() {
    return (
        <section className='py-5'>
            <div className='row'>
                <div className='col-10 mx-auto col-md-6 my-3'>
                    <Title title='contact-us' />
                    <form className='mt-5' action="https://formspree.io/xjvarpwr"
        method="POST">
                        {/* first */}
                        <div className='form-group'>
                            <input type='text' name='firstName' placeholder='First Name' className='form-control' />
                        </div>
                        {/* email */}
                        <div className='form-group'>
                            <input type='email' name='email' placeholder='mail@xyz.com' className='form-control' />
                        </div>
                        {/* subject */}
                        <div className='form-group'>
                            <input type='text' name='subject' placeholder='Important!!' className='form-control' />
                        </div>
                        {/* text area */}
                        <div className='form-group'>
                            <textarea name='message' id='' className='form-control' placeholder='hello' rows='10'></textarea>
                        </div>
                        {/* submit */}
                        <div className='form-group mt-3'>
                            <input type='submit' value='Send' className='form-control bg-primary text-white'></input>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
