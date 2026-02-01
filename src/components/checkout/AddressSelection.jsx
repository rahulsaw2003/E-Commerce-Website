import React, { useState } from "react";
import { AddCircle } from "@mui/icons-material";

const AddressSelection = ({
  addresses,
  selectedAddress,
  handleAddressChange,
  onAddAddress,
}) => {
  return (
    <div className="address-container">
      <div className="address-header">
        <h2 className="select-address">Select Delivery Address</h2>
        <button className="add-address-btn" onClick={onAddAddress}>
          <AddCircle className="icon" /> Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="no-address-message">
          <p>No delivery address found. Please add an address to continue.</p>
        </div>
      ) : (
        <div className="address-radio-group">
          {addresses.map((address) => (
            <div className="address-radio-item" key={address.id}>
              <label
                htmlFor={`address-${address.id}`}
                className={selectedAddress?.id === address.id ? "selected" : ""}
              >
                <input
                  type="radio"
                  id={`address-${address.id}`}
                  name="address"
                  value={address.id}
                  checked={selectedAddress?.id === address.id}
                  onChange={handleAddressChange}
                />
                <h3 className="recipient-name">{address.name}</h3>
              </label>
              <div className="address-info ">
                <span className="address-details">{address.address}</span>
                <span className="phone-number">
                  Phone Number: {address.phoneNumber}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { AddressSelection };
