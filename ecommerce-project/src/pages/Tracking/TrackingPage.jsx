import './TrackingPage.css'
import { Header } from "../../components/Header";
import { Link, useLocation } from 'react-router';
import dayjs from 'dayjs';

export function TrackingPage({ cart = [], orders = [], loadCart }) {
  const location = useLocation();
  const order = location?.state?.order || (orders && orders.length ? orders[0] : null);

  const firstProduct = order?.products?.[0];

  const totalDeliveryTimeMs = firstProduct?.estimatedDeliveryTimeMs && order?.orderTimeMs 
    ? firstProduct.estimatedDeliveryTimeMs - order.orderTimeMs
    : 0;
  const timePassedMs = order?.orderTimeMs
    ? dayjs().valueOf() - order.orderTimeMs
    : 0;

  let deliveryPercent = totalDeliveryTimeMs > 0 
    ? (timePassedMs / totalDeliveryTimeMs) * 100
    : 0;
  
  deliveryPercent = Math.min(Math.max(deliveryPercent, 0), 100);

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;


  return (
    <>
  <Header cart={cart} loadCart={loadCart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? 'Delivered on ' : 'Arriving on '}
            {firstProduct?.estimatedDeliveryTimeMs 
              ? dayjs(firstProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')
              : 'Unknown date'}
          </div>

          <div className="product-info">
            {firstProduct ? firstProduct.product.name : 'Order item'}
          </div>

          <div className="product-info">Quantity: {firstProduct ? firstProduct.quantity : '-'}</div>

          {firstProduct?.product?.image && (
            <img
              className="product-image"
              src={firstProduct.product.image}
              alt={firstProduct.product.name || 'product'}
            />
          )}

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>Preparing</div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>Shipped</div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{
              width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}
