import React from "react";
import { Marker } from "react-google-maps";
import fontawesome from "fontawesome-markers";

// ------------Icon Styles-----------------

export const iconHome = {
    path: fontawesome.HOME,
    fillColor: "#5bc1de",
    fillOpacity: 1,
    strokeWeight: 2,
    strokeOpacity: 0.9,
    scale: 0.65
}

export const iconDestination = {
    path: fontawesome.STAR,
    fillColor: "#d9c636",
    fillOpacity: 1,
    strokeWeight: 2,
    strokeOpacity: 0.9,
    scale: 0.65
}

export const iconPlace = {
    path: fontawesome.MAP_MARKER,
    fillColor: "#fcaf44",
    fillOpacity: 1,
    strokeWeight: 2,
    strokeOpacity: 0.9,
    scale: 0.65
}

// --------------------Marker Generators--------------------------

export const makeMarker = (key, position, icon) => {
    // creates a marker with specified key, lat lng position, and icon
    return (
        <Marker key={key} position={position} icon={icon} />
    );
}

export const makeIncidentMarker = (incident) => {
    // given an incident, create a marker
    let fillColor;
    switch(incident.severity) {
        case 1: fillColor = "#5cb85c";
            break;
        case 2: fillColor = "#757575";
            break;
        case 3: fillColor = "#f0ad4f";
            break;
        default: fillColor = "#d95250";
    }
    let path;
    switch (incident.type) {
        case 1: path = fontawesome.WARNING;
            break;
        case 2: path = fontawesome.FLAG;
            break;
        case 3: path = fontawesome.CAR;
            break;
        default: path = fontawesome.INFO;
    }
    const incidentIcon = {
        path,
        fillColor,
        fillOpacity: 1,
        strokeWeight: 1.5,
        strokeOpacity: 0.9,
        scale: 0.45
    }
    return (<Marker key={incident.id} position={{lat: incident.lat, lng: incident.lng}} icon={incidentIcon} />);
}