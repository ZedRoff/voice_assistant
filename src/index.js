import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import "./style.css"
let domNode = document.getElementById("root")
let root = ReactDOM.createRoot(domNode)
root.render(<App />)