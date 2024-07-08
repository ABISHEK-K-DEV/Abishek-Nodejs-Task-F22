import React from 'react';

const Cart = ({ cartItems, onQuantityChange, onAddressChange, onCheckout }) => {
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      return item.price ? acc + item.price * item.quantity : acc;
    }, 0).toFixed(2);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="border p-4 mb-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-900 font-bold mb-2">
                {item.price !== undefined ? `$${item.price.toFixed(2)}` : 'Price not available'}
              </p>
              <div className="mb-2">
                <label className="block mb-1">Quantity</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onQuantityChange(item._id, Math.max(1, Number(e.target.value)))}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Delivery Address</label>
                <input
                  type="text"
                  value={item.address}
                  onChange={(e) => onAddressChange(item._id, e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>
          ))}
          <h3 className="text-xl font-semibold mb-4">Subtotal: ${calculateSubtotal()}</h3>
          <button
            onClick={onCheckout}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
