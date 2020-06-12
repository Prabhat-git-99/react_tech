import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Contact from './pages/ContactPage';
import Default from './pages/Default';
import Products from './pages/ProductsPage';
import SingleProduct from './pages/SingleProduct';
import About from './pages/AboutPage';
import Cart from './pages/CartPage';
import { Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import SideBar from './components/Sidebar';
import SideCart from './components/SideCart';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <>
        {/* navbar,sidebar,footer */}
        <Navbar />
        <SideBar />
        <SideCart />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About} />
          <Route path='/contact' exact component={Contact} />
          <Route path='/products' exact component={Products} />
          <Route path='/products/:id' exact component={SingleProduct} />
          <Route path='/cart' component={Cart} />
          <Route component={Default} />
        </Switch>
        <Footer />
      </>
    );
  }
}


export default App;
