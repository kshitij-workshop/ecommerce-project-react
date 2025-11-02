import axios from "axios";
import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/Tracking/TrackingPage";
import "./App.css";

window.axios = axios

function App() {
  const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      const fetchOrdersData = async () => {
        const response = await axios.get("/api/orders?expand=products");
        setOrders(response.data);
      };
      fetchOrdersData();
    }, []);

  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart} orders={orders}/>} />
      <Route path="tracking" element={< TrackingPage cart={cart} orders={orders} />} />  
    </Routes>
  );
}

export default App;
