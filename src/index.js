import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "store"
import reportWebVitals from "./reportWebVitals"
import "antd/dist/antd.css"
import "react-perfect-scrollbar/dist/css/styles.css"
import "./i18n"
import "./styles.scss"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

reportWebVitals()
