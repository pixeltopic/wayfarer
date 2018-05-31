import React from "react";
import { decodePolyline, calcCenterWithBounds } from "../logic/mapLogic.js";
import fontawesome from "fontawesome-markers";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import { MAP_API_KEY } from "../actions/apiKeys";

const PolylineMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap defaultZoom={9} defaultCenter={props.routeCenter} >
    <Polyline path={props.decodedPoly} geodesic={true} 
    options={{ strokeColor: '#ff2527', strokeOpacity: 0.8, strokeWeight: 2 }}/>
    {props.isMarkerShown && props.markerArray}
    </GoogleMap>
));

const iconHome = {
    path: fontawesome.HOME,
    fillColor: "#5bc1de",
    fillOpacity: 1,
    strokeWeight: 2,
    strokeOpacity: 0.9,
    scale: 0.65
}

const iconDestination = {
    path: fontawesome.STAR,
    fillColor: "#d9c636",
    fillOpacity: 1,
    strokeWeight: 2,
    strokeOpacity: 0.9,
    scale: 0.65
}

const makeMarker = (key, position, icon) => {
    // creates a marker with specified key, lat lng position, and icon
    return (
        <Marker key={key} position={position} icon={icon} />
    );
}

export const PolylineMap = (props) => {
    // takes routeBounds and overviewPolyine props given info from a this.props.directionData route
    // and renders map
    const decodedPolyline = decodePolyline(props.overviewPolyline);
    const markerArray = [makeMarker(1,decodedPolyline[0],iconHome), makeMarker(2,decodedPolyline[decodedPolyline.length-1],iconDestination)];
    return (
        <PolylineMapComponent
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            decodedPoly={decodedPolyline}
            routeCenter={calcCenterWithBounds(props.routeBounds)}
            markerArray={markerArray}
        />);

}

const makeIncidentMarker = (incident) => {
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

export const IncidentPolylineMap = (props) => {
    // takes routeBounds and overviewPolyine props given info from a this.props.directionData route
    // also takes in a single this.props.incidentsData key and renders any incidents from the array value with correct icon depending on type
    const decodedPolyline = decodePolyline(props.overviewPolyline);
    const markerArray = [makeMarker(1,decodedPolyline[0],iconHome), makeMarker(2,decodedPolyline[decodedPolyline.length-1],iconDestination)];
    const incidentsMarkerArray = props.incidentsArray.map(
        (incident) => {
            return makeIncidentMarker(incident);
        }
    );
    return (
        <PolylineMapComponent
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            decodedPoly={decodedPolyline}
            routeCenter={calcCenterWithBounds(props.routeBounds)}
            markerArray={markerArray.concat(incidentsMarkerArray)}
        />);

}