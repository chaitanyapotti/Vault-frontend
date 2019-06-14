import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./static/css/app.css";
import App from "./App";
import registerServiceWorker, { unregister } from "./registerServiceWorker";

unregister();
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
