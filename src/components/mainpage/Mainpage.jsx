/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import ProductCard from '../productcard/PoductCard'; // Corrected typo in import path
import '../footer/footer.css';

const MainPage = ({ searchQuery, sortOption, category, addtocart }) => { // Standardized addToCart
    const [products, setProducts] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, [apiUrl]); // Include apiUrl as a dependency in useEffect

    const filteredProducts = products
        .filter(product => 
            // eslint-disable-next-line react/prop-types
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&                                                                  
            (category ? product.category === category : true)               
        )
        .sort((a, b) => {
            if (sortOption === 'price') {
                return a.price - b.price;
            }
            if (sortOption === 'rating') {
                return b.rating.rate - a.rating.rate;
            }
            return 0;
        });

    return (
        <div className="maincontent">
            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} addToCart={addtocart} /> 
                    ))
                ) : (
                    <p style={{ color: "red", fontFamily: "fantasy", fontSize: "25px", textAlign: "center" }}>
                        No search results found
                    </p>
                )}
            </div>
        </div>
    );
};

export default MainPage;
