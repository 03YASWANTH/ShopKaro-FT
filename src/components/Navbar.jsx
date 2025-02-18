import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';

export const Navbar = ({ cartItemsCount = 0 }) => {
    const navigate = useNavigate();
    
    return (
        <nav className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 sm:px-6 py-3 shadow-lg sticky top-0 w-full flex flex-wrap justify-between items-center z-50">
            <div className="flex items-center space-x-2">
                <div className="text-2xl sm:text-3xl font-bold tracking-wide flex items-center group">
                    <span className="bg-white text-orange-500 p-1 rounded-lg mr-2 transform group-hover:rotate-12 transition-transform duration-300">🛒</span>
                    <span className="hidden sm:inline">ShopKaro</span>
                    <span className="sm:hidden">SK</span>
                </div>
            </div>
            
            <div className="flex items-center space-x-4 sm:space-x-6">
                <button 
                    className="text-white p-2 rounded-full hover:bg-orange-600 transition-all duration-300"
                    onClick={() => navigate('/')}
                >
                    <FaHome size={20} />
                </button>
                
                <button 
                    className="relative p-2 rounded-full hover:bg-orange-600 transition-all duration-300 group"
                    onClick={() => navigate('/Cart')}
                >
                    <FaShoppingCart size={20} />
                </button>

            </div>
        </nav>
    );
};