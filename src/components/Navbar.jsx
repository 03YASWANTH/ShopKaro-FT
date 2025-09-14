import { useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaSearch, FaSignOutAlt } from "react-icons/fa";

export const Navbar = ({ cartItemsCount = 0, searchTerm, setSearchTerm }) => {
  
  const navigate = useNavigate();

  const onLogout = ()=>{
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="bg-gradient-to-r from-orange-400/70 to-orange-500/70 text-white px-4 sm:px-6 py-3 shadow-lg sticky top-0 w-full flex items-center justify-between z-50 backdrop-blur-md">

      <div className="flex items-center space-x-2">
        <div className="text-2xl sm:text-3xl font-bold tracking-wide flex items-center group">
          <span className="hidden sm:inline">ShopKaro</span>
          <span className="sm:hidden">SK</span>
        </div>
      </div>


      <div className="flex-1 px-4 max-w-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" size={16} />
        </div>
      </div>

      
      <div className="flex items-center space-x-4 sm:space-x-6">
        <button
          className="text-white p-2 rounded-full hover:bg-orange-600 transition-all duration-300"
          onClick={() => navigate("/home")}
        >
          <FaHome size={20} />
        </button>

        <button
          className="relative p-2 rounded-full hover:bg-orange-600 transition-all duration-300"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart size={20} />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-2 rounded-full">
              {cartItemsCount}
            </span>
          )}
        </button>

        <button
          className="p-2 rounded-full hover:bg-red-600 transition-all duration-300"
          onClick={onLogout}
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </nav>
  );
};
