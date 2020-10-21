//index.js
import React from 'react'
import ReactDOM from 'react-dom'
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';

// class App extends React.Component {
//     render() {
//         return (
//             <div className="container">
//                 <h1 className="center-align">
//                     盒装一流弊<br/>
//                     <span className="waves-effect waves-light btn">
//                         <i className="material-icons right">cloud</i>您说的都对
//                     </span>
//                 </h1>
//             </div>
//         );
//     }
// }

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'))