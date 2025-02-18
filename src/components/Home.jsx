import React, { useState, useEffect } from 'react';
import {Card} from '../components/Card';
import { useRecoilState } from 'recoil';
import {productAtom} from '../atoms/productAtom';

export const Home = () => {
    const [products, setProducts] = useRecoilState(productAtom);

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(res => res.json())
            .then(data => setProducts(data.slice(0, 16))) 
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <>
            <div className="container mx-auto px-40 py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {products.map((product) => (
                        <Card key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
};
