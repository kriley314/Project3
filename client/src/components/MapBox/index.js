import React from "react";
import "./style.css";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

//var myMap;
var thompsonConference = { lat: 30.28715, lng: -97.72910 };

const style = {
    width: '100%',
    height: '100%'
}

function MapBox( props ) {
    return (
        <div>
            <Map google={props.google}
                 style={style}
                 initialCenter={thompsonConference}
                 zoom={props.gZoom}
                 name={props.gName}>
              <Marker onClick = { props.gOnMarkerClick } title = {'Thompson Conference Center'} name = { props.gname }/>
              <InfoWindow onClose = { props.gOnClose }></InfoWindow>
            </Map>
        </div>
    );
}


export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
}) (MapBox);
