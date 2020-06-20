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
        storedProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        singleProduct: {},
        loading: true,
        search: '',
        price: 0,
        min: 0,
        max: 0,
        company: 'all',
        shipping: false
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
        let maxPrice = Math.max(...storedProducts.map(item => item.price));
        this.setState({
            storedProducts,
            filteredProducts:storedProducts,
            featuredProducts,
            cart: this.getStorageCart(),
            singleProduct: this.getStorageProduct(),
            loading: false,
            price: maxPrice,
            max: maxPrice
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
        let product = this.state.storedProducts.find(item => item.id === id);
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
        this.setState({cartOpen: !this.state.cartOpen});
    };
    //close cart
    closeCart = () => {
        this.setState({ cartOpen: false});
    };
    openCart = () => {
        this.setState({ cartOpen: true});
    };

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id===id);
        cartItem.count++;
        cartItem.total = cartItem.count*cartItem.price;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));
        this.setState(() => {
            return {
                cart: [...tempCart]
            };
        },
            () => {
                this.addTotals();
                this.syncStorage();
            }
        );
    }
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);
        cartItem.count = cartItem.count - 1;
        if(cartItem.count === 0){
            this.removeItem(id);
        }
        else{
            cartItem.total = cartItem.count*cartItem.price;
            cartItem.total = parseFloat(cartItem.total.toFixed(2));
            this.setState(
                () => {
                    return {
                        cart: [...tempCart]
                    };
                },
                () => {
                    this.addTotals();
                    this.syncStorage();
                }
            );
        }
    }
    removeItem = (id) => {
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        this.setState(
            {
                cart: [...tempCart]
            },
            () => {
                this.addTotals();
                this.syncStorage();
            }
        );
    }
    clearCart = () => {
        this.setState(
            {
                cart: []
            },
            () => {
                this.addTotals();
                this.syncStorage();
            }
        )
    }
    handleChange = (event) => {
        console.log(event);
    }
    sortData = () => {

    }
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
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                handleChange: this.handleChange
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider};
