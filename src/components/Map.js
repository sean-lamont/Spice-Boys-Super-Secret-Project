/* global window,document */
import React, {Component} from 'react';
//import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import Overlay from './Overlay.js';
import Dimensions from 'react-dimensions'

import {json as requestJson} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWNlb2ZzcGllcyIsImEiOiJjajVvaDg0d2Q0MXJhMnFvODUzNjQ3MmZ5In0.xLzbJqDG59zkyw2CKEXaow'; // eslint-disable-line

// Source data GeoJSON
const DATA_URL = 'https://raw.githubusercontent.com/Spice-Boys/Spice-Boys-Super-Secret-Project/master/public/datasets/ACT%20Division%20Boundaries.geojson'; // eslint-disable-line

const colorScale = r => [140, r * 255, 200 * (1 - r)];

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                ...Overlay.defaultViewport,
            },
            data: null
        };

        requestJson(DATA_URL, (error, response) => {
            if (!error) {
                this.setState({data: response});
            }
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();
    }

    _resize() {
        this._onViewportChange({
            width: this.refs.mapBox.clientWidth,
            height: this.refs.mapBox.clientHeight
        });
    }

    _onViewportChange(viewport) {
        this.setState({
            viewport: {...this.state.viewport, ...viewport}
        });
    }

    render() {
        const {viewport, data} = this.state;
        return (
            <div className="map" ref="mapBox">
                <MapGL
                    {...viewport}
                    onViewportChange={this._onViewportChange.bind(this)}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                >
                    <Overlay viewport={viewport}
                                   data={data}
                                   colorScale={colorScale}
                                   />
                </MapGL>
            </div>
        );
    }
}

export default Map