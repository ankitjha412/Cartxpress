/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Cart = ({ cartItems, handleRemove, handleChangeQuantity, searchQuery, sortOption, category, handleclearcart }) => {
  const [filteredCart, setFilteredCart] = useState(cartItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const totalPrice = filteredCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  };

  const handleConfirmOrder = () => {
    setIsModalOpen(false);
    alert("Order Placed Successfully!");
    handleclearcart(); // Clear the cart after placing the order
    navigate('/'); // Redirect to home or confirmation page
  };

  // Apply search query, sort option, and category filter on cart items
  useEffect(() => {
    let filtered = [...cartItems];

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (sortOption === 'price') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'rating') {
      filtered = filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setFilteredCart(filtered);
  }, [cartItems, searchQuery, sortOption, category]);

  return (
    <div className="cart">
      <h1 style={{ color: 'orange' }}>Your Cart Items:</h1>
      <button className="clear-all-button" onClick={handleclearcart}>
        Clear All Items
      </button>

      {filteredCart.length === 0 ? (
        <p style={{ color: 'red' }}>
          <b>Your cart is empty.</b>
        </p>
      ) : (
        filteredCart.map((item) => (
          <div className="cart-box" key={item.id}>
            <div className="cart-img">
              <img src={item.image} alt={item.title} />
              <p>
                <b>{item.title}</b>
              </p>
              <p>{item.description}</p>
              <div>
                <button onClick={() => handleChangeQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleChangeQuantity(item.id, 1)}>+</button>
              </div>
              <div>
                <button onClick={() => handleRemove(item.id)} className="remove-button">
                  Remove
                </button>
              </div>
              <div className="total">
                <span>Total Price: ${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="cart-total">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>

      <button onClick={handlePlaceOrder} className="place-order-button">
        Place Order
      </button>

      <button onClick={handleBackToHome} className="back-to-home-button">
        Back to Home
      </button>

      {/* Modal for fake payment */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="payment-modal-title"
        aria-describedby="payment-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="payment-modal-title" variant="h6" component="h2">
            Complete Your Payment
          </Typography>
          <Typography id="payment-modal-description" sx={{ mt: 2 }}>
            Total Amount: ${totalPrice.toFixed(2)}
          </Typography>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <TextField
            label="Expiry Date (MM/YY)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <TextField
            label="CVV"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleConfirmOrder}
          >
            Confirm Payment
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
