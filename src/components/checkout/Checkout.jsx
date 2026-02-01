import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAuth, useCart } from "context";
import { AddressSelection } from "./AddressSelection";
import { OrderDetails } from "./OrderDetails";
import { PriceDetails } from "./PriceDetails";
import { DeliveryDetails } from "./DeliveryDetails ";
import { handleCheckout } from "./checkoutLogic";
import { AddressModal } from "./AddressModal";

import "./checkout.css";

// Helper functions for localStorage
const getAddressesFromStorage = () => {
  const stored = localStorage.getItem("userAddresses");
  return stored ? JSON.parse(stored) : [];
};

const saveAddressesToStorage = (addresses) => {
  localStorage.setItem("userAddresses", JSON.stringify(addresses));
};

const Checkout = () => {
  const { cartState } = useCart();
  const { cart } = cartState;
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    quantity,
    totalPrice,
    totalMrp,
    discountedPrice,
    isCouponApplied,
    coupon,
  } = location.state;


  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Load addresses from localStorage on mount
  useEffect(() => {
    const storedAddresses = getAddressesFromStorage();
    setAddresses(storedAddresses);
    if (storedAddresses.length > 0) {
      setSelectedAddress(storedAddresses[0]);
    }
  }, []);

  const handleAddressChange = (event) => {
    const selectedId = parseInt(event.target.value);
    const address = addresses.find((addr) => addr.id === selectedId);
    setSelectedAddress(address);
  };

  const handleAddAddress = () => {
    setShowAddressModal(true);
  };

  const handleSaveAddress = (newAddress) => {
    const addressWithId = {
      ...newAddress,
      id: Date.now(), // Simple ID generation
    };
    const updatedAddresses = [...addresses, addressWithId];
    setAddresses(updatedAddresses);
    saveAddressesToStorage(updatedAddresses);
    setSelectedAddress(addressWithId);
    setShowAddressModal(false);
    toast.success("Address added successfully!");
  };

  const handleCheckoutClick = () => {
    // Check if user has added an address
    if (addresses.length === 0 || !selectedAddress) {
      toast.error("Please add a delivery address before proceeding");
      return;
    }

    if (!isLoggedIn) {
      // Save checkout state and redirect to login
      toast("Please login to complete your order");
      navigate("/login", {
        state: {
          from: { pathname: "/checkout" },
          checkoutData: {
            selectedAddress,
            totalPrice,
            cart,
            quantity,
            totalMrp,
            discountedPrice,
            isCouponApplied,
            coupon
          }
        }
      });
    } else {
      // User is logged in, proceed with payment
      handleCheckout(selectedAddress, totalPrice);
    }
  };

  return (
    <>
      <div className="checkout-heading">
        <h2>Checkout 🎉</h2>
      </div>
      <div className="checkout-container">
        <AddressSelection
          addresses={addresses}
          selectedAddress={selectedAddress}
          handleAddressChange={handleAddressChange}
          onAddAddress={handleAddAddress}
        />

        <div className="right-order-container">
          <OrderDetails cart={cart} quantity={quantity} />

          <hr />
          <PriceDetails
            cart={cart}
            totalMrp={totalMrp}
            discountedPrice={discountedPrice}
            isCouponApplied={isCouponApplied}
            coupon={coupon}
            totalPrice={totalPrice}
          />
          <hr />
          {selectedAddress && <DeliveryDetails selectedAddress={selectedAddress} />}

          <div className="place-order-container">
            <button className="place-order-button" onClick={handleCheckoutClick}>
              Place Order
            </button>
          </div>
        </div>
      </div>

      {showAddressModal && (
        <AddressModal
          onSave={handleSaveAddress}
          onClose={() => setShowAddressModal(false)}
        />
      )}
    </>
  );
};

export { Checkout };
