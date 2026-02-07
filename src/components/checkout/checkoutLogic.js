import { toast } from "react-toastify";

// PhonePe Payment Configuration
const PAYMENT_CONFIG = {
  // UPI VPA ID for receiving payments
  UPI_ID: '9798312264@okbizaxis',

  // Payment note/description shown in payment app
  PAYMENT_NOTE: 'ATTIREX Order Payment',

  // Currency code
  CURRENCY: 'INR',

  // Transaction context
  TRANSACTION_CONTEXT: 'p2p',
};

/**
 * Generate PhonePe payment deep link
 * @param {number} amountInRupees - Amount to be paid in rupees
 * @param {object} selectedAddress - Customer delivery address
 * @returns {string} PhonePe payment URL
 */
const generatePhonePePaymentUrl = (amountInRupees, selectedAddress) => {
  const amountInPaisa = Math.round(amountInRupees * 100);

  const paymentData = {
    contact: {
      cbsName: selectedAddress.name || "",
      nickName: selectedAddress.name || "",
      vpa: PAYMENT_CONFIG.UPI_ID,
      type: "VPA"
    },
    p2pPaymentCheckoutParams: {
      note: PAYMENT_CONFIG.PAYMENT_NOTE,
      isByDefaultKnownContact: true,
      enableSpeechToText: false,
      allowAmountEdit: false,
      showQrCodeOption: false,
      disableViewHistory: true,
      shouldShowUnsavedContactBanner: false,
      isRecurring: false,
      checkoutType: "DEFAULT",
      transactionContext: PAYMENT_CONFIG.TRANSACTION_CONTEXT,
      initialAmount: amountInPaisa,
      disableNotesEdit: true,
      showKeyboard: true,
      currency: PAYMENT_CONFIG.CURRENCY,
      shouldShowMaskedNumber: true
    }
  };

  const jsonString = JSON.stringify(paymentData);
  const base64String = btoa(jsonString);
  const paymentUrl = `phonepe://native?data=${base64String}&id=p2ppayment`;

  console.log('💰 Payment Amount:', `₹${amountInRupees}`);
  console.log('💰 Amount in Paisa:', amountInPaisa);
  console.log('📱 Customer:', selectedAddress.name);
  console.log('🔗 PhonePe Payment URL:', paymentUrl);

  return paymentUrl;
};

/**
 * Handle checkout and redirect to PhonePe payment
 * @param {object} selectedAddress - Customer delivery address
 * @param {number} totalPrice - Total order amount
 */
const handleCheckout = async (selectedAddress, totalPrice) => {
  try {
    // Generate PhonePe payment URL
    const paymentUrl = generatePhonePePaymentUrl(totalPrice, selectedAddress);

    // Show loading message
    toast.info("Redirecting to PhonePe for payment...");

    // Small delay for better UX
    setTimeout(() => {
      // Redirect to PhonePe app
      window.location.href = paymentUrl;

      // Fallback: Show instructions if app doesn't open
      setTimeout(() => {
        toast.warning("If PhonePe didn't open automatically, please ensure the app is installed on your device.");
      }, 2000);
    }, 500);

  } catch (error) {
    console.error('Payment error:', error);
    toast.error("Failed to initiate payment. Please try again.");
  }
};

export { handleCheckout, PAYMENT_CONFIG };
