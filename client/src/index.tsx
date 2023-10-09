import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Router>
    <Provider store={store}>
      <HelmetProvider>
        <PayPalScriptProvider
          deferLoading={true}
          options={{ clientId: "test" }}
        >
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </Provider>
  </Router>
);
