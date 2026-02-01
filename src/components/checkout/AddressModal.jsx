import React, { useState } from "react";
import { Close, MyLocation } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import "./addressModal.css";

const AddressModal = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "+91 ",
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        city: "",
        state: "",
    });

    const [errors, setErrors] = useState({});
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [loadingPincode, setLoadingPincode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    // Fetch city and state from pincode
    const fetchLocationFromPincode = async (pincode) => {
        if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
            return;
        }

        setLoadingPincode(true);
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();

            if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
                const location = data[0].PostOffice[0];
                setFormData(prev => ({
                    ...prev,
                    city: location.District,
                    state: location.State
                }));
                toast.success("Location auto-filled!");
            } else {
                toast.error("Invalid pincode");
                setFormData(prev => ({ ...prev, city: "", state: "" }));
            }
        } catch (error) {
            console.error("Error fetching pincode data:", error);
            toast.error("Failed to fetch location");
        } finally {
            setLoadingPincode(false);
        }
    };

    const handlePincodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
        setFormData(prev => ({ ...prev, pincode: value }));

        if (errors.pincode) {
            setErrors(prev => ({ ...prev, pincode: "" }));
        }

        if (value.length === 6) {
            fetchLocationFromPincode(value);
        }
    };

    // Get current location with detailed address
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation not supported");
            return;
        }

        setLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
                    );
                    const data = await response.json();

                    if (data.address) {
                        const addr = data.address;

                        // Extract detailed address components
                        const building = addr.building || addr.house_number || "";
                        const road = addr.road || addr.street || "";
                        const suburb = addr.suburb || addr.neighbourhood || addr.quarter || "";
                        const locality = addr.locality || addr.village || "";

                        // Address Line 1: Building/House number + Road/Street
                        const addressLine1 = [building, road].filter(Boolean).join(", ");

                        // Address Line 2: Suburb/Neighbourhood + Locality
                        const addressLine2 = [suburb, locality].filter(Boolean).join(", ") ||
                            addr.city_district || "";

                        const pincode = (addr.postcode || "").replace(/\s/g, "").slice(0, 6);

                        setFormData(prev => ({
                            ...prev,
                            addressLine1: addressLine1,
                            addressLine2: addressLine2,
                            city: addr.city || addr.town || addr.village || "",
                            state: addr.state || "",
                            pincode: pincode
                        }));

                        toast.success("Location filled successfully!");
                    }
                } catch (error) {
                    console.error("Error fetching location:", error);
                    toast.error("Failed to fetch address");
                } finally {
                    setLoadingLocation(false);
                }
            },
            (error) => {
                setLoadingLocation(false);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        toast.error("Location access denied");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        toast.error("Location unavailable");
                        break;
                    case error.TIMEOUT:
                        toast.error("Request timed out");
                        break;
                    default:
                        toast.error("Location error");
                }
            }
        );
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name required";
        }

        const phone = formData.phoneNumber.replace(/\s/g, "");
        if (!phone || phone === "+91") {
            newErrors.phoneNumber = "Mobile required";
        } else if (!/^\+91\d{10}$/.test(phone)) {
            newErrors.phoneNumber = "Invalid mobile number";
        }

        if (!formData.addressLine1.trim()) {
            newErrors.addressLine1 = "Address required";
        }

        if (!formData.addressLine2.trim()) {
            newErrors.addressLine2 = "Area required";
        }

        if (!formData.pincode) {
            newErrors.pincode = "Pincode required";
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Invalid pincode";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City required";
        }

        if (!formData.state.trim()) {
            newErrors.state = "State required";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const completeAddress = `${formData.addressLine1}, ${formData.addressLine2}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

        onSave({
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            address: completeAddress,
            pincode: formData.pincode,
            city: formData.city,
            state: formData.state
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content compact" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add Address</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Close">
                        <Close />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="address-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={errors.name ? "error" : ""}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Mobile *</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="+91 XXXXXXXXXX"
                            className={errors.phoneNumber ? "error" : ""}
                        />
                        {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="pincode">Pincode *</label>
                            <input
                                type="text"
                                id="pincode"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handlePincodeChange}
                                placeholder="6-digit"
                                maxLength="6"
                                className={errors.pincode ? "error" : ""}
                            />
                            {loadingPincode && <span className="info-text">Loading...</span>}
                            {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City *</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                className={errors.city ? "error" : ""}
                                readOnly={loadingPincode}
                            />
                            {errors.city && <span className="error-text">{errors.city}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">State *</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                            className={errors.state ? "error" : ""}
                            readOnly={loadingPincode}
                        />
                        {errors.state && <span className="error-text">{errors.state}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="addressLine1">Building / Floor / Street *</label>
                        <input
                            type="text"
                            id="addressLine1"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                            placeholder="e.g., 123, MG Road"
                            className={errors.addressLine1 ? "error" : ""}
                        />
                        {errors.addressLine1 && <span className="error-text">{errors.addressLine1}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="addressLine2">Area / Locality *</label>
                        <input
                            type="text"
                            id="addressLine2"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                            placeholder="e.g., Sector 62, Noida"
                            className={errors.addressLine2 ? "error" : ""}
                        />
                        {errors.addressLine2 && <span className="error-text">{errors.addressLine2}</span>}
                    </div>

                    <button
                        type="button"
                        className="use-location-btn"
                        onClick={getCurrentLocation}
                        disabled={loadingLocation}
                    >
                        <MyLocation className="icon" />
                        {loadingLocation ? "Fetching..." : "Use my current location"}
                    </button>

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn">
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { AddressModal };
