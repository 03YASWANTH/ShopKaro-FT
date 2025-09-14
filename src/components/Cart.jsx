import { useRecoilState } from 'recoil';
import { cartAtom } from '../atoms/cartAtom';
import { useState } from 'react';

export const Cart = () => {
    const [cart, setCart] = useRecoilState(cartAtom);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem("token");

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity <= 0) return; 
        setCart(cart.map(item => 
            item._id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const handleRemove = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    setLoading(true);
    setMessage('');

    try {
        const response = await fetch('http://localhost:3000/api/v1/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                products: cart.map(item => ({
                    productId: item._id,
                    name:item.name,
                    quantity: item.quantity
                }))
            }),
        });

        const data = await response.json();

        if (data.success) {
            setMessage('Order placed successfully!');
            setCart([]); // clear cart
        } else {
            setMessage(data.message || 'Failed to place order');
        }
    } catch (error) {
        console.error(error);
        setMessage('Server error. Please try again later.');
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

            {cart.map(item => (
                <div key={item._id} className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <img 
                            src={item.ImageUrl} 
                            alt={item.title} 
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-gray-600 text-sm">${item.price}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button 
                            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg mr-4"
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        >
                            -
                        </button>
                        <span className="text-gray-700">{item.quantity}</span>
                        <button 
                            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg ml-4"
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex items-center">
                        <button 
                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                            onClick={() => handleRemove(item._id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            <div className="flex justify-between mt-4 mb-4">
                <h3 className="text-2xl font-semibold">Total Price:</h3>
                <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>

            <div className="text-center">
                <button
                    onClick={handlePlaceOrder}
                    className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
                {message && <p className="mt-4 text-green-600">{message}</p>}
            </div>
        </div>
    );
};
