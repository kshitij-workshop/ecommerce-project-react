import './TrackingPage.css'
import { Header } from "../../components/Header";
import { Link, useLocation } from 'react-router';
import dayjs from 'dayjs';

export function TrackingPage({ cart = [], orders = [] }) {
  const location = useLocation();
  const order = location?.state?.order || (orders && orders.length ? orders[0] : null);

  const firstProduct = order?.products?.[0];
  const deliveryDate = firstProduct?.estimatedDeliveryTimeMs
    ? dayjs(firstProduct.estimatedDeliveryTimeMs).format('MMMM D')
    : null;

  return (
    <>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryDate ? `Arriving on ${deliveryDate}` : 'Arriving soon'}
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
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
