import React, { Component } from 'react';
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        sidebarOpen: false,
        cartOpen: false,
        noOfItem: 0
    };
    //handle side bar
    handleSidebar = () => {
        this.setState({sidebarOpen: !this.state.sidebarOpen});
    };
    //handle cart
    handleCart = () => {
        this.setState({cartOpen: !this.state.sidebarOpen});
    };
    //close cart
    closeCart = () => {
        this.setState({ cartOpen: false});
    };
    openCart = () => {
        this.setState({ cartOpen: true});
    };
    render() {
        return(
            <ProductContext.Provider value={{
                ...this.state,
                handleSidebar: this.handleSidebar,
                handleCart: this.handleCart,
                closeCart: this.closeCart,
                openCart: this.openCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider};