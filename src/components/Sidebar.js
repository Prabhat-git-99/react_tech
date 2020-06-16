import React from 'react';
import { ProductConsumer } from '../context';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <ProductConsumer>
            {value => {
                const { links, sidebarOpen, handleSidebar} = value;
                // console.log(links);
                // console.log(sidebarOpen);
                return(
                    <SideWrapper show={sidebarOpen}>
                        <ul>
                            {
                                links.map(link => {
                                    return(
                                        <li key={link.id}>
                                            <Link to={link.path} className='sidebar-link' onClick={handleSidebar}>{link.text}</Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </SideWrapper>
                )
            }}
        </ProductConsumer>
    )
}

const SideWrapper = styled.nav`
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--mainGrey);
    z-index: 1;
    border-right: 4px solid var(--primaryColor);
    transition: var(--mainTransition);
    transform: ${props => props.show?'translateX(0)':'translateX(-100%)'};
    ul {
        list-style-type: none;
        padding: 5px !important;
    }
    .sidebar-link {
        display: block;
        font-size: 1.5rem;
        text-transform: capitalize;
        color: var(--mainBlack);
        background: transparent;
        transition: var(--mainTransition);
        padding: 10px;
        padding-left: 2rem;
    }
    .sidebar-link:hover{
        background: var(--primaryColor);
        color: var(--mainWhite);
        padding: 0.5rem 1.5rem 0.5rem 2.5rem;
        text-decoration: none;
    }
    @media (min-width:576px){
        width: 20rem;
    }
`