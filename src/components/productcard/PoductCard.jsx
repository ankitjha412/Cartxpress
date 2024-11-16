/* eslint-disable react/prop-types */
import'./productcard.css/';
const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating.rate} / 5</p>
            <p>owned by:{product.rating.count}</p>

            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
