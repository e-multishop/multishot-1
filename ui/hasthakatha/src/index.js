import React from "react"
import ReactDOM from "react-dom"
import App from "./App.js"
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import store from './Redux/store'
// import rootReducer from './Redux/reducers/index';
// const store=createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
console.warn("check store",store);
ReactDOM.render(
<Provider store={store}>
        <App />
</Provider>,
document.getElementById("root"));