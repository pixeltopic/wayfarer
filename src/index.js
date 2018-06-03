import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import rootReducer from "./reducers/rootReducer";
import './index.css';

import App from './App';
import ShowDirections from "./components/showDirections.js";
import ShowIncidents from "./components/showIncidents.js";
import ShowPlaces from "./components/showPlaces.js";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStore(
    rootReducer,
    applyMiddleware(promiseMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/directions" component={ShowDirections} />
                    <Route path="/incidents" component={ShowIncidents} />
                    <Route path="/places" component={ShowPlaces} />
                    <Route path="/" component={App} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
