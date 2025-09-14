import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { useRecoilState } from "recoil";
import { productAtom } from "../atoms/productAtom";

export const Home = ({ searchTerm }) => {
  const [products, setProducts] = useRecoilState(productAtom);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const token = localStorage.getItem('token');

  // Fetch products once
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/product",{
      method:"GET",
       headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const term = searchTerm?.toLowerCase() || "";

    let results = products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.category.name.toLowerCase().includes(term)
    );

    if (minPrice) {
      results = results.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter((p) => p.price <= Number(maxPrice));
    }

    setFilteredProducts(results);
  }, [searchTerm, minPrice, maxPrice, products]);
 
  return (
    <div className=" bg-gray-200 container mx-auto px-6 sm:px-10 py-10">
      
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        <div className="flex gap-3 items-center">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-28 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-28 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};