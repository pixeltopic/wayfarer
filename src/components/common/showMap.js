import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from "react-google-maps";

import { MAP_API_KEY } from "../../actions/apiKeys";
import { decodePolyline, calcCenterWithBounds } from "./mapLogic";
import { iconHome, iconDestination, makeMarker, makeIncidentMarker, iconPlace } from "./mapMarkers";

const PolylineMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap defaultZoom={9} defaultCenter={props.routeCenter} >
    <Polyline path={props.decodedPoly} geodesic={true} 
    options={{ strokeColor: '#ff2527', strokeOpacity: 0.8, strokeWeight: 2 }}/>
    {props.isMarkerShown && props.markerArray}
    </GoogleMap>
));

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

export const PlacePolylineMap = (props) => {
    // takes place lat lng and renders a marker on the map along with the polyline from a respective route
    // custom props: overviewPolyline, routeBounds, placeLocation
    const decodedPolyline = decodePolyline(props.overviewPolyline);
    const markerArray = [
        makeMarker(0, decodedPolyline[0],iconHome), 
        makeMarker(1, decodedPolyline[decodedPolyline.length-1],iconDestination),
        makeMarker(2, props.placeLocation,iconPlace)
    ];
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