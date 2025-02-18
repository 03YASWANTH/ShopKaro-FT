import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartAtom } from '../atoms/cartAtom';
import { productAtom } from '../atoms/productAtom';
import { FaArrowLeft, FaShoppingCart, FaHeart, FaShare, FaStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const products = useRecoilValue(productAtom);
    const [cart, setCart] = useRecoilState(cartAtom);
    const product = products.find(p => p.id == id);
    
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    
    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                    <FaShoppingCart className="mx-auto text-gray-300 mb-4" size={64} />
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Product Not Found</h2>
                    <p className="text-gray-500 mb-6">We couldn't find the product you're looking for.</p>
                    <button 
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
                        onClick={() => navigate('/')}
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }
    
    const isInCart = cart.some(item => item.id === product.id);
    
    const handleCartToggle = () => {
        if (isInCart) {
            setCart(cart.filter(item => item.id !== product.id));
            toast.error((t) => (
                <div className="flex items-center">
                    <FaShoppingCart className="mr-2" />
                    <span>Removed from Cart</span>
                </div>
            ), {
                position: 'top-center',
                duration: 3000,
            });
        } else {
            setCart([...cart, { ...product, quantity }]);
            toast.success((t) => (
                <div className="flex items-center">
                    <FaShoppingCart className="mr-2" />
                    <span>Added to Cart</span>
                </div>
            ), {
                position: 'top-center',
                duration: 3000,
            });
        }
    };
    
    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* React Hot Toast Container */}
            <Toaster 
                position="top-center"
                toastOptions={{
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />
            
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <button 
                        className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft />
                        <span>Back</span>
                    </button>
                    
                    <h1 className="text-xl font-medium text-gray-700 hidden md:block">Product Details</h1>
                    
                    <button 
                        className="relative flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
                        onClick={() => navigate('/cart')}
                    >
                        <FaShoppingCart />
                        <span className="hidden md:inline">View Cart</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-6 flex flex-col">
                            <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.title}
                                    className="w-full h-80 md:h-96 object-contain mix-blend-multiply"
                                />
                            </div>
                            
                            {product.images.length > 1 && (
                                <div className="flex space-x-2 overflow-x-auto pb-2">
                                    {product.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            className={`flex-shrink-0 border-2 rounded-md overflow-hidden ${
                                                selectedImage === idx ? 'border-blue-500' : 'border-gray-200'
                                            }`}
                                            onClick={() => setSelectedImage(idx)}
                                        >
                                            <img 
                                                src={img} 
                                                alt={`${product.title} view ${idx + 1}`} 
                                                className="w-16 h-16 object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
                                    <div className="flex items-center mt-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {product.category?.name || 'No Category'}
                                        </span>
                                        <div className="flex items-center ml-4">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-300"} />
                                            ))}
                                            <span className="ml-1 text-sm text-gray-500">(24 reviews)</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="text-gray-400 hover:text-gray-600 p-2">
                                    <FaShare />
                                </button>
                            </div>
                            
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-700">Description</h3>
                                <p className="mt-2 text-gray-600 leading-relaxed">{product.description}</p>
                            </div>
                            
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-700">Price</h3>
                                <div className="flex items-center mt-2">
                                    <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                                    {product.discountPercentage && (
                                        <div className="ml-4">
                                            <span className="text-sm text-gray-500 line-through">${(product.price * (1 + product.discountPercentage/100)).toFixed(2)}</span>
                                            <span className="ml-1 text-sm font-medium text-green-600">
                                                Save {product.discountPercentage}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-700">Quantity</h3>
                                <div className="flex items-center mt-2">
                                    <button 
                                        onClick={decrementQuantity}
                                        className="bg-gray-100 text-gray-600 hover:bg-gray-200 p-2 rounded-l-lg"
                                    >
                                        -
                                    </button>
                                    <span className="bg-gray-100 px-4 py-2 text-center min-w-[3rem]">
                                        {quantity}
                                    </span>
                                    <button 
                                        onClick={incrementQuantity}
                                        className="bg-gray-100 text-gray-600 hover:bg-gray-200 p-2 rounded-r-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-8 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                                <button
                                    className={`flex-1 flex justify-center items-center space-x-2 px-6 py-3 rounded-lg shadow-md transition-all ${
                                        isInCart 
                                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                    onClick={handleCartToggle}
                                >
                                    <FaShoppingCart />
                                    <span>{isInCart ? 'Remove from Cart' : 'Add to Cart'}</span>
                                </button>
                                <button
                                    className="flex-1 bg-gray-100 text-gray-800 hover:bg-gray-200 px-6 py-3 rounded-lg shadow-md transition-all"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};