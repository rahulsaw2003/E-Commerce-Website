import React, { createContext, useReducer, useContext, useEffect } from "react";

import { wishlistReducer } from "reducer";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SET_WISHLIST,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "utils";
import { useAuth } from "./authContext";

const WishlistContext = createContext();

const GUEST_WISHLIST_KEY = "guestWishlist";

const WishlistContextProvider = ({ children }) => {
  const { token, isLoggedIn } = useAuth();

  // Set the initial state for the wishlist context
  const initialState = {
    wishlist: [],
  };

  // Use the wishlistReducer and initialState with useReducer to manage the state
  const [wishlistState, wishlistDispatch] = useReducer(
    wishlistReducer,
    initialState
  );

  // Helper: Get guest wishlist from localStorage
  const getGuestWishlist = () => {
    try {
      const guestWishlist = localStorage.getItem(GUEST_WISHLIST_KEY);
      return guestWishlist ? JSON.parse(guestWishlist) : [];
    } catch (error) {
      console.error("Error reading guest wishlist:", error);
      return [];
    }
  };

  // Helper: Save guest wishlist to localStorage
  const saveGuestWishlist = (wishlist) => {
    try {
      localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving guest wishlist:", error);
    }
  };

  // Helper: Clear guest wishlist from localStorage
  const clearGuestWishlist = () => {
    try {
      localStorage.removeItem(GUEST_WISHLIST_KEY);
    } catch (error) {
      console.error("Error clearing guest wishlist:", error);
    }
  };

  // Load wishlist on mount or when auth state changes
  useEffect(() => {
    const syncData = async () => {
      if (isLoggedIn && token) {
        // Check if we need to sync guest data
        const shouldSync = localStorage.getItem("shouldSyncGuestData");
        if (shouldSync === "true") {
          // Sync guest wishlist to backend
          await syncGuestWishlistToBackend(token);
          // Clear the sync flag
          localStorage.removeItem("shouldSyncGuestData");
        } else {
          // Just fetch from backend
          fetchWishlist();
        }
      } else {
        // Guest user - load from localStorage
        const guestWishlist = getGuestWishlist();
        wishlistDispatch({ type: SET_WISHLIST, payload: guestWishlist });
      }
    };

    syncData();
  }, [isLoggedIn, token]);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist(token);
      const { data } = response;
      wishlistDispatch({ type: SET_WISHLIST, payload: data.wishlist });
    } catch (error) {
      console.error("Fetch Wishlist Error:", error);
    }
  };

  const addToWishlistHandler = async (product) => {
    try {
      if (isLoggedIn && token) {
        // Authenticated user - save to backend
        await addToWishlist(token, product);
        wishlistDispatch({
          type: ADD_TO_WISHLIST,
          payload: product,
        });
      } else {
        // Guest user - save to localStorage
        const currentWishlist = getGuestWishlist();
        const productInWishlist = currentWishlist.find(
          (item) => item._id === product._id
        );

        if (!productInWishlist) {
          const updatedWishlist = [...currentWishlist, product];
          saveGuestWishlist(updatedWishlist);
          wishlistDispatch({
            type: ADD_TO_WISHLIST,
            payload: product,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlistHandler = async (productId) => {
    try {
      if (isLoggedIn && token) {
        // Authenticated user - remove from backend
        await removeFromWishlist(token, productId);
        wishlistDispatch({ type: REMOVE_FROM_WISHLIST, payload: productId });
      } else {
        // Guest user - remove from localStorage
        const currentWishlist = getGuestWishlist();
        const updatedWishlist = currentWishlist.filter(
          (item) => item._id !== productId
        );
        saveGuestWishlist(updatedWishlist);
        wishlistDispatch({ type: REMOVE_FROM_WISHLIST, payload: productId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Sync guest wishlist to backend (called after login/signup)
  const syncGuestWishlistToBackend = async (authToken) => {
    try {
      const guestWishlist = getGuestWishlist();
      if (guestWishlist.length > 0) {
        // Add each guest wishlist item to backend
        for (const item of guestWishlist) {
          await addToWishlist(authToken, item);
        }
        // Clear guest wishlist after sync
        clearGuestWishlist();
        // Fetch updated wishlist from backend
        const response = await getWishlist(authToken);
        const { data } = response;
        wishlistDispatch({ type: SET_WISHLIST, payload: data.wishlist });
      }
    } catch (error) {
      console.error("Error syncing guest wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistState,
        fetchWishlist,
        addToWishlistHandler,
        removeFromWishlistHandler,
        syncGuestWishlistToBackend,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to consume the WishlistContext
const useWishlist = () => useContext(WishlistContext);

export { WishlistContextProvider, useWishlist };
