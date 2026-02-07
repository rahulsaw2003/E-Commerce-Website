import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Context Providers
import {
  AuthProvider,
  CartContextProvider,
  FilterContextProvider,
  ProductsDataProvider,
  WishlistContextProvider,
} from "context";

// CSS Styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProductsDataProvider>
        <FilterContextProvider>
          <AuthProvider>
            <WishlistContextProvider>
              <CartContextProvider>
                <App />
              </CartContextProvider>
            </WishlistContextProvider>
          </AuthProvider>
        </FilterContextProvider>
      </ProductsDataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
