import axios from "axios";
import dayjs from "dayjs";
import { Fragment } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../components/Header";
import { formatMoney } from "../../utils/money";
import "./OrdersPage.css";
import { Link } from "react-router";

export function OrdersPage({ cart, loadCart, orders }) {
  const navigate = useNavigate();

  const trackPackage = (order) => {
    // navigate to tracking page and pass the order in location state
    navigate("/tracking", { state: { order } });
  };
  

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-facicon.png" />

  <Header cart={cart} loadCart={loadCart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    const addToCart = async () => {
                      await axios.post('/api/cart-items', {
                        // Note: you can also get the productId from
                        // orderProduct.productId
                        productId: orderProduct.product.id,
                        quantity: 1
                      });
                      await loadCart();
                    };
                    return (
                      <Fragment key={orderProduct.product.id}>
                        <div className="product-image-container">
                          <img src={orderProduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            {dayjs().valueOf() > orderProduct.estimatedDeliveryTimeMs
                              ? "Delivered on: "
                              : "Arriving on: "}
                            {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                              "MMMM D"
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary" onClick={addToCart}>
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <button
                            className="track-package-button button-secondary"
                            onClick={() => trackPackage(order)}
                          >
                            Track package
                          </button>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
