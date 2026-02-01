import React from "react";

const PriceDetails = ({
  cart,
  totalMrp,
  discountedPrice,
  isCouponApplied,
  coupon,
  totalPrice,
}) => {
  return (
    <div className="price-details">
      <div className="price-detail-row price-header">
        <span className="price-label">Price Details:</span>
        <span className="item-count">({cart.length} items)</span>
      </div>

      <div className="price-detail-row">
        <span className="price-label">Total MRP:</span>
        <span className="price-value">₹{totalMrp}</span>
      </div>

      <div className="price-detail-row discount-row">
        <span className="price-label">Discount:</span>
        <span className="price-value discount-value">- ₹{discountedPrice}</span>
      </div>

      {isCouponApplied && (
        <div className="price-detail-row coupon-row">
          <span className="price-label">Applied Coupon:</span>
          <span className="price-value coupon-value">- ₹{coupon}</span>
        </div>
      )}

      <div className="price-detail-row delivery-row">
        <span className="price-label">Delivery Charges:</span>
        <span className="delivery-charges">
          <span className="original-delivery">₹99</span>
          <span className="free-badge">Free</span>
        </span>
      </div>

      <hr className="price-divider" />

      <div className="price-detail-row total-amount">
        <span className="total-label">Total Amount:</span>
        <span className="total-value">₹{totalPrice}</span>
      </div>
    </div>
  );
};

export { PriceDetails };
