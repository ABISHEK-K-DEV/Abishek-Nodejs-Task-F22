import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [viewCart, setViewCart] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1, address: '' }]);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setCart(cart.map((item) => (item._id === id ? { ...item, quantity } : item)));
  };

  const handleAddressChange = (id, address) => {
    setCart(cart.map((item) => (item._id === id ? { ...item, address } : item)));
  };

  const handleCheckout = async () => {
    try {
      await axios.post('http://localhost:5000/checkout', { cart });
      alert('Order placed successfully!');
      setCart([]);
      setViewCart(false);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Product List</h1>
      <button
        onClick={() => setViewCart(!viewCart)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        {viewCart ? 'Back to Products' : `View Cart (${cart.length})`}
      </button>
      {viewCart ? (
        <Cart
          cartItems={cart}
          onQuantityChange={handleQuantityChange}
          onAddressChange={handleAddressChange}
          onCheckout={handleCheckout}
        />
      ) : (
        <ProductList products={products} onAddToCart={addToCart} />
      )}
    </div>
  );
};

export default App;
