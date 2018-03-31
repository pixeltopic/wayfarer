import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ShowDirections from "./components/show_directions.js";

// cd C:\Users\xmobl\Documents\GitRepos\wayfarer

/*
TODO:

study google maps API and decide how to construct a redux-form component

*/

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Wayfarer</h1>
                </header>
                <div>
                    <ShowDirections />
                </div>
            </div>
         );
    }
}

export default App;
