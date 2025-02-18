import React from 'react';
import { useRecoilState } from 'recoil';
import { cartAtom } from '../atoms/cartAtom';

export const Cart = () => {
    const [cart, setCart] = useRecoilState(cartAtom);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity <= 0) return; 
        setCart(cart.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const handleRemove = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    if (cart.length === 0) {
        return <p className="text-center text-gray-500">Your cart is empty</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

            {cart.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <img 
                            src={item.images[0]} 
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
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                            -
                        </button>
                        <span className="text-gray-700">{item.quantity}</span>
                        <button 
                            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg ml-4"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex items-center">
                        <button 
                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                            onClick={() => handleRemove(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            <div className="flex justify-between mt-4">
                <h3 className="text-2xl font-semibold">Total Price:</h3>
                <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>
        </div>
    );
};
