import React from "react";

const DeliveryDetails = ({ selectedAddress }) => {
  return (
    <>
      <h3 className="section-title delivery-title">Deliver To</h3>
      <div className="delivery-container">
        <div className="deliver-to">
          <div className="recipient-name">{selectedAddress.name}</div>
          <div className="delivery-address">
            {selectedAddress.address}
          </div>
          <div className="phone-number">
            <span className="phone-label">Phone:</span> {selectedAddress.phoneNumber}
          </div>
        </div>
      </div>
    </>
  );
};

export { DeliveryDetails };
