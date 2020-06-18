import React, { Component } from 'react';
import { linkData } from './linkData';
import { socialData } from './socialData';
import { items } from './productData';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        sidebarOpen: false,
        cartOpen: false,
        cartItems: 0,
        links: linkData,
        socialLinks: socialData,
        cart: [],
        cartSubTotal: 0,
        cartTax: 0,
        carTotal: 0,
        storeProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        singleProduct: {},
        loading: false
    };

    componentDidMount(){
        this.setProducts(items);
    }

    //setProduct
    setProducts = (products) => {
        let storedProducts = products.map(item => {
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            const product = {id,...item.fields, image};
            return product;
        });
        // console.log(storedProducts);
        let featuredProducts = storedProducts.filter(item => item.featured===true);
        this.setState({
            storedProducts,
            filteredProducts:storedProducts,
            featuredProducts,
            cart: this.getStorageCart(),
            singleProduct: this.getStorageProduct(),
            loading: false
        },
        () => {
            this.addTotals();
        })
    };

    getStorageCart = () => {
        let cart;
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        else{
            cart = []
        }
        return cart;
    };

    getStorageProduct = () => {
        return localStorage.getItem('singleProduct')?JSON.parse(localStorage.getItem('singleProduct')):{};
    };

    getTotals = () => {
        let subTotal = 0;
        let cartItems = 0;
        this.state.cart.forEach(item => {
            subTotal += item.total;
            cartItems += item.count;
        })
        subTotal = parseFloat(subTotal.toFixed(2));
        let tax = subTotal*0.1;
        tax = parseFloat(tax.toFixed(2));
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));
        return {
            cartItems,
            subTotal,
            tax,
            total
        };
    };
    

    addTotals = () => {
        const totals = this.getTotals();
        this.setState({
            cartItems: totals.cartItems,
            cartSubTotal: totals.subTotal,
            cartTax: totals.tax,
            cartTotal: totals.total
        })
    };

    syncStorage = () => {
        localStorage.setItem('cart',JSON.stringify(this.state.cart));
    };
    addToCart = id => {
        // console.log(id)
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.storedProducts];
        // console.log(tempProducts);
        let tempItem = tempCart.find(item => item.id===id);
        // console.log('heyy inside')
        // console.log('see',tempItem)
        if( !tempItem ) {
            // console.log('inside if');
            tempItem = tempProducts.find(item => item.id===id);
            // console.log('tempItem',tempItem);
            let total = tempItem.price;
            let cartItem = {...tempItem,count:1,total};
            tempCart = [...tempCart,cartItem];
        }
        else{
            tempItem.count++;
            tempItem.total = tempItem.price*tempItem.count; 
            tempItem.total = parseFloat(tempItem.total.toFixed(2));
        }
        this.setState(() => {
            return {cart:tempCart}
        },() => {
            this.addTotals();
            this.syncStorage();
            this.openCart();
        })
        // console.log('cart',this.state.cart);
    };
    setSingleProduct = (id) => {
        let product = this.state.storeProducts.find(item => item.id === id);
        localStorage.setItem('singleProduct',JSON.stringify(product));
        this.setState({
            singleProduct: {...product},
            loading: false
        })
    }

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
                openCart: this.openCart,
                addToCart: this.addToCart,
                setSingleProduct: this.setSingleProduct,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider};
