import React from "react";
import { decodePolyline, calcCenterWithBounds } from "../logic/mapLogic.js";
import fontawesome from "fontawesome-markers";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import { MAP_API_KEY } from "../actions/apiKeys";

const testMarkerArray = [<Marker key={1} position={{ lat: -34.397, lng: 150.644 }} />, 
<Marker key={2} position={{ lat: -33.397, lng: 145.644 }} />];

const MarkerMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap defaultZoom={5} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown && testMarkerArray}
    </GoogleMap>
    ));

export const MarkerMap = (props) => {
    return (
        <MarkerMapComponent
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );

}

const PolylineMapComponent = withScriptjs(withGoogleMap((props) =>
// find a way to pass directions in
    <GoogleMap defaultZoom={9} defaultCenter={props.routeCenter} >
    <Polyline path={props.decodedPoly} geodesic={true} 
    options={{ strokeColor: '#ff2527', strokeOpacity: 0.8, strokeWeight: 2 }}/>
    {props.isMarkerShown && props.markerArray}
    </GoogleMap>
));

const icon = {
    path: fontawesome.MAP_PIN,
    fillColor: '#E32831',
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 0.65
}

const makeMarker = (key, position, icon) => {
    return (
        <Marker key={key} position={position} icon={icon} />
    );
}

export const PolylineMap = (props) => {
    // takes routeBounds and overviewPolyine props given info from a this.props.directionData route
    // and renders map
    const decodedPolyline = decodePolyline(props.overviewPolyline);
    // const markerArray = [<Marker key={1} position={decodedPolyline[0]} icon={icon} />, 
    // <Marker key={2} position={decodedPolyline[decodedPolyline.length-1]} icon={icon} />];
    const markerArray = [makeMarker(1,decodedPolyline[0],icon), 
    makeMarker(2,decodedPolyline[decodedPolyline.length-1],icon)];
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