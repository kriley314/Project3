import React, { Component } from 'react';
import firebase from "./../../utils/firebase.js";
import "./style.css";

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

var thompsonConference = { lat: 30.28715, lng: -97.72910 };

const style = {
    width: '100%',
    height: '100%'
}


// This is called when out timer expires so we can set our position in Firebase.

class MapBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pinsArray: [],
            positionRef: null,
            myPosition: thompsonConference,
            intervalId: null
        };
    }

    componentWillMount() {
        // Use componentWillMount to setup the timer processing.  Make the call every 60 seconds.
        const id = setInterval( this.processTimeoutEvent, 60000 );
        this.setState({ intervalId: id })
    }

    componentWillUnmount() {
        // We're done so stop the timer processing.
        clearInterval( this.state.intervalId );
    }

    // This function will set up timer processing to "occasionally" call to get our pin
    // location information from Firebase and then update the pins on the map.
    componentDidMount() {

        firebase.database().ref("/pins").orderByChild("groupID").equalTo(this.props.gGroupName).on("value", snapshot => {
            console.log(snapshot.val());
            const newPinsObject = snapshot.val();

            // Now loop through the NEW pins objects and convert to array of pins locations..
            const newPinsArray = Object.keys( newPinsObject ).map(( elem ) => {
                return {
                    groupID: newPinsObject[ elem ].groupID,
                    name: newPinsObject[ elem ].name,
                    x: newPinsObject[ elem ].x,
                    y: newPinsObject[ elem ].y
                };
            });

            this.setState({ pinsArray: newPinsArray });
        });

        // Browser geolocation API asks for permission to get location data.
        // Once accepted, the latitude and longitude can be obtained in the Decimal Degrees unit
        navigator.geolocation.getCurrentPosition((position) => {

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            this.setState({ myPosition: { latitude, longitude }});
            if ( "geolocation" in navigator ) {
                // If the user accepted location services, write their name, group, and position in the database.
                // Since 'push' is being used, firebase creates a unique ID based on time and entropy that is the parent of the data
                // In addition to writing data, positionRef's value is equal to the unique ID generated so that it can be referenced later

                const ref = firebase.database().ref("/pins").push({
                    groupID: this.props.gGroupName,
                    name: this.props.gName, x: latitude, y: longitude
                });
                console.log("Just added row in pins table for: " + this.props.gGroupName + ":" + this.props.gName + ":" +
                    latitude + ":" + longitude);
                // Setup a call to take care of cleaning up - removing our line in Firebase - on disconnect..
                ref.onDisconnect().remove();
                this.setState({ positionRef: ref });
            }
            else {
                // No navigation ability will notify the user
                console.log("no navigation ability");
                // window.location.replace = "geo.html" - Future enhancement!!
            }

            this.processTimeoutEvent();
        });
    }

    processTimeoutEvent = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            if ("geolocation" in navigator) {
                // If the user accepted location services, write their name, group, and position in the database.
                // Since 'push' is being used, firebase creates a unique ID based on time and entropy that is the parent of the data
                // In addition to writing data, positionRef's value is equal to the unique ID generated so that it can be referenced later
                this.state.positionRef.set({ groupID: this.props.gGroupName, name: this.props.gName, x: latitude, y: longitude });
                console.log( "Just updated my position in Firebase: " + latitude + ":" + longitude );
            }
            else {
                // No navigation ability will notify the user
                console.log("no navigation ability");
            }
        });
    }

    render() {
        return (
            <div>
                <Map google = { this.props.google }
                    style = { style }
                    initialCenter = { thompsonConference }
                    zoom = { this.props.gZoom }
                    name = { this.props.gName }>
                    {
                        this.state.pinsArray.map( marker => (
                            <Marker
                                title={marker.name}
                                label={marker.name}
                                position={{ lat: marker.x, lng: marker.y }}
                                key={marker.key}
                            />
                        ))
                    }
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(MapBox);
