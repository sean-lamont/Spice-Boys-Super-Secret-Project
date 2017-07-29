import React, { Component } from 'react';

/// / ES6
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

export default class Map extends Component {

    render() {
        const Map = ReactMapboxGl({
            accessToken: "pk.eyJ1IjoiYWNlb2ZzcGllcyIsImEiOiJjajVvaDg0d2Q0MXJhMnFvODUzNjQ3MmZ5In0.xLzbJqDG59zkyw2CKEXaow"
        });

        return <Map
            style="mapbox://styles/aceofspies/cj5ow46yd0d132rmoxb04lwoc"
            center={[149.1, -35.3]}
            zoom={[10]}
            containerStyle={{
                height: "100vh",
                width: "65vw"
            }}>
            <Layer
                type="symbol"
                id="marker"
                layout={{"icon-image": "marker-15"}}>
                <Feature coordinates={[-35.3, 149.1]}/>
            </Layer>
        </Map>
    };
}