import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Cart from './components/Cart/Cart';
import Navbar from './components/navbar/Navbar';
import MainPage from './components/mainpage/Mainpage';
import Footer from './components/footer/Footer';
import './App.css'; 
// import Payment from './components/payment/Payment';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [category, setCategory] = useState('');

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const handleclearcart = () => {
         
          setCart([]);  // Clear the cart if user confirms
        
      };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addtocart = (product) => {
        let itemInCart = cart.find((item) => item.id === product.id);

        if (itemInCart) {
            alert("Item already in cart.");
            return;
        }

        setCart([...cart, { ...product, quantity: 1 }]);
    };

    const handleRemove = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const handleChangeQuantity = (id, delta) => {
        setCart(cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <Router>
            <div className="App">
                <Navbar
                    onSearch={setSearchQuery}
                    onSort={setSortOption}
                    onCategoryChange={setCategory}
                    count={totalItemsInCart}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <MainPage
                                searchQuery={searchQuery}
                                sortOption={sortOption}
                                category={category}
                                addtocart={addtocart}
                            />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <Cart
                                cartItems={cart}
                                handleRemove={handleRemove}
                                handleChangeQuantity={handleChangeQuantity}
                                searchQuery={searchQuery}     
                                sortOption={sortOption}       
                                category={category}
                                handleclearcart={handleclearcart}          
                            />
                        }
                    />
                    
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
