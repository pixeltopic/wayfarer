import React, { Component } from 'react';
import { Well } from "react-bootstrap";

import SearchInput from "./searchInput";
import NavBar from "../common/navBar";
import logo from "../../assets/bonfire_logo.gif";
import "../../style/App.css";

// cd C:\Users\xmobl\Documents\GitRepos\wayfarer

/*
TODO:
searchInput Form info - REQUIRED:
origin/destination=input
travel mode=drop down menu (driving, bicycling, walking, transit)
OPTIONAL:
alternatives=checkmark (true or false for alternate routes) if it's false, don't even bother creating
a url str
avoid=checklist of things to avoid (tolls, highways, ferries, indoor if walking) does not guarantee avoidance
MAKE SURE TO VALIDATE INDOOR IF WALKING
can specify multiple avoids in URL by using | to divide
units=dropdown (metric or imperial, imperial by default)

Example URL with all 6 parameters used:
https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&avoid=highways&mode=bicycling&alternatives=true&units=imperial&key=
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
                    <NavBar />
                    <div className="App-body">
                        <Well>
                            <SearchInput />
                        </Well>
                    </div>
                    
                </div>
            </div>
         );
    }
}

export default App;
