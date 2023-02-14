import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    {/* este ↑ sirve para que lo que esta adentro pueda usar el estore de ridux */}
    <BrowserRouter>
      {/* este ↑ otro sirve para que lo que esta adentro pueda usar las rutas  */}
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{ redirect_uri: window.location.origin + "/home" }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
