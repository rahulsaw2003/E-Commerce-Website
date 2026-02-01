import React from "react";

const OrderDetails = ({ cart, quantity }) => {
  return (
    <>
      <h2 className="section-title">Order Details</h2>
      <div className="order-details-container">
        <div className="ordered-items">
          {cart.map((item) => (
            <div className="order-item-card" key={item.id}>
              <div className="order-item-image">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="order-item-info">
                <h3 className="order-item-name">{item.name}</h3>
                <div className="order-item-details">
                  <div className="detail-row">
                    <span className="detail-label">Quantity</span>
                    <span className="detail-value">{item.quantity}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Price</span>
                    <span className="detail-value">₹{item.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { OrderDetails };
