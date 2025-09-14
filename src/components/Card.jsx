import { useNavigate } from 'react-router-dom';

 export const Card = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div 
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
        >
            <img 
                src={product.ImageUrl} 
                alt={product.title} 
                className="w-full h-80 object-contain rounded-lg"
            />
            <div className="mt-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-500">{product.category?.name || 'No Category'}</p>
                <div className='flex justify-between items-center mt-2'>
                    <p className="text-blue-600 font-bold mt-1">${product.price}</p>
                    
                </div>
            </div>
        </div>
    );
};


