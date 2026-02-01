import { createContext, useReducer, useContext, useEffect } from "react";

import { cartReducer } from "reducer";
import { useAuth } from "./authContext";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART,
  addToCart,
  getCart,
  removeFromCart,
} from "utils";

const CartContext = createContext();

const GUEST_CART_KEY = "guestCart";

const CartContextProvider = ({ children }) => {
  const { token, isLoggedIn } = useAuth();

  // Define the initial state for the cart
  const initialState = {
    cart: [],
  };

  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

  // Helper: Get guest cart from localStorage
  const getGuestCart = () => {
    try {
      const guestCart = localStorage.getItem(GUEST_CART_KEY);
      return guestCart ? JSON.parse(guestCart) : [];
    } catch (error) {
      console.error("Error reading guest cart:", error);
      return [];
    }
  };

  // Helper: Save guest cart to localStorage
  const saveGuestCart = (cart) => {
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving guest cart:", error);
    }
  };

  // Helper: Clear guest cart from localStorage
  const clearGuestCart = () => {
    try {
      localStorage.removeItem(GUEST_CART_KEY);
    } catch (error) {
      console.error("Error clearing guest cart:", error);
    }
  };

  // Load cart on mount or when auth state changes
  useEffect(() => {
    const syncData = async () => {
      if (isLoggedIn && token) {
        // Check if we need to sync guest data
        const shouldSync = localStorage.getItem("shouldSyncGuestData");
        if (shouldSync === "true") {
          // Sync guest cart to backend
          await syncGuestCartToBackend(token);
          // Remove flag (wishlist will remove it too, so check before removing)
        } else {
          // Just fetch from backend
          fetchCart();
        }
      } else {
        // Guest user - load from localStorage
        const guestCart = getGuestCart();
        cartDispatch({ type: SET_CART, payload: guestCart });
      }
    };

    syncData();
  }, [isLoggedIn, token]);

  const fetchCart = async () => {
    try {
      const response = await getCart(token);
      const { data } = response;
      cartDispatch({ type: SET_CART, payload: data.cart });
    } catch (error) {
      console.error("Fetch Cart Error:", error);
    }
  };

  const addToCartHandler = async (product) => {
    try {
      if (isLoggedIn && token) {
        // Authenticated user - save to backend
        await addToCart(token, product);
        cartDispatch({
          type: ADD_TO_CART,
          payload: product,
        });
      } else {
        // Guest user - save to localStorage
        const currentCart = getGuestCart();
        const productInCart = currentCart.find(
          (item) => item._id === product._id
        );

        let updatedCart;
        if (productInCart) {
          // Increment quantity if product already in cart
          updatedCart = currentCart.map((item) =>
            item._id === product._id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          // Add new product with quantity 1
          updatedCart = [...currentCart, { ...product, qty: 1 }];
        }

        saveGuestCart(updatedCart);
        cartDispatch({
          type: ADD_TO_CART,
          payload: product,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCartHandler = async (productId) => {
    try {
      if (isLoggedIn && token) {
        // Authenticated user - remove from backend
        await removeFromCart(token, productId);
        cartDispatch({ type: REMOVE_FROM_CART, payload: productId });
      } else {
        // Guest user - remove from localStorage
        const currentCart = getGuestCart();
        const updatedCart = currentCart.filter(
          (item) => item._id !== productId
        );
        saveGuestCart(updatedCart);
        cartDispatch({ type: REMOVE_FROM_CART, payload: productId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Sync guest cart to backend (called after login/signup)
  const syncGuestCartToBackend = async (authToken) => {
    try {
      const guestCart = getGuestCart();
      if (guestCart.length > 0) {
        // Add each guest cart item to backend
        for (const item of guestCart) {
          await addToCart(authToken, item);
        }
        // Clear guest cart after sync
        clearGuestCart();
        // Fetch updated cart from backend
        const response = await getCart(authToken);
        const { data } = response;
        cartDispatch({ type: SET_CART, payload: data.cart });
      }
    } catch (error) {
      console.error("Error syncing guest cart:", error);
    }
  };

  // Provide the cartState and cartDispatch to the components in the tree
  return (
    <CartContext.Provider
      value={{
        cartState,
        fetchCart,
        cartDispatch,
        addToCartHandler,
        removeFromCartHandler,
        syncGuestCartToBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the CartContext
const useCart = () => useContext(CartContext);

export { useCart, CartContextProvider };
