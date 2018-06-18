import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";

import rootReducer from "./reducers/rootReducer";
import "./style/index.css";
import App from "./components/home/App";
import ShowDirections from "./components/directions/showDirections";
import ShowIncidents from "./components/incidents/showIncidents";
import ShowPlaces from "./components/places/showPlaces";
import ShowPlaceDetails from "./components/places/showPlaceDetails";

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
                    <Route path="/places/details" component={ShowPlaceDetails} />
                    <Route path="/places" component={ShowPlaces} />
                    <Route path="/" component={App} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
