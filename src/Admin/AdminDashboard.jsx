import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ShoppingCart, Users, Menu, X } from "lucide-react";
import ProductManagement from "./ProductManagment";
import OrderManagement from "./OrderManagment";

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch("http://localhost:3000/api/v1/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://localhost:3000/api/v1/Orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();

      if (productsData.success && ordersData.success) {
        const pendingOrders = ordersData.orders.filter(
          (order) => order.status === "Pending"
        ).length;
        const revenue = ordersData.orders.reduce((total, order) => {
          return (
            total +
            order.products.reduce((orderTotal, item) => {
              return orderTotal + (item.productId?.price || 0) * item.quantity;
            }, 0)
          );
        }, 0);

        setDashboardStats({
          totalProducts: productsData.products.length,
          totalOrders: ordersData.orders.length,
          pendingOrders,
          revenue,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <Package className="h-8 w-8 text-orange-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardStats.totalProducts}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <ShoppingCart className="h-8 w-8 text-orange-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardStats.totalOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <ShoppingCart className="h-8 w-8 text-orange-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pending Orders
              </p>
              <p className="text-3xl font-bold text-orange-600">
                {dashboardStats.pendingOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <Users className="h-8 w-8 text-orange-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">
                ${dashboardStats.revenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Products in Stock</span>
              <span className="font-semibold text-gray-800">
                {dashboardStats.totalProducts}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Orders This Month</span>
              <span className="font-semibold text-gray-800">
                {dashboardStats.totalOrders}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Orders</span>
              <span className="font-semibold text-orange-600">
                {dashboardStats.pendingOrders}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Dashboard loaded successfully
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Statistics updated</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Ready for management
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminApp = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", key: "dashboard", icon: Users },
    { name: "Products", key: "products", icon: Package },
    { name: "Orders", key: "orders", icon: ShoppingCart },
  ];
  const Navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  const renderSidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-orange-500">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X className="h-6 w-6 text-gray-400" />
        </button>
      </div>
      <nav className="mt-8">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => {
                setCurrentPage(item.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-orange-50 transition-colors ${
                currentPage === item.key
                  ? "bg-orange-50 text-orange-600 border-r-4 border-orange-500"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          );
        })}
        <button
          onClick={onLogout}
          className="w-full flex items-center px-6 py-3 text-left text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-13v1"
            />
          </svg>
          Logout
        </button>
      </nav>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductManagement />;
      case "orders":
        return <OrderManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {renderSidebar()}

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            <div></div>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default AdminApp;