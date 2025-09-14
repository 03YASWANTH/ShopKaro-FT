import { useEffect, useState } from "react";

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/orders/my-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Uncomment if your API requires auth
          },
        });

        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading orders...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;
  if (orders.length === 0) return <p className="text-center mt-8 text-gray-500">No orders found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>
      {console.log(orders)}
      {orders.map((order) => (
        <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">Order ID: {order._id}</h3>
          <p className="text-gray-600 mb-4">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
          <div className="mb-4">
            {order.products.map((item, index) => (
              <div key={index} className="flex justify-between mb-2 border-b pb-2">
                <span>{item.productId.title} x {item.quantity}</span>
                <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
