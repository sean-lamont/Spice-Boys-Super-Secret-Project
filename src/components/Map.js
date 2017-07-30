/* global window,document */
import React, {Component} from 'react';
//import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import Overlay from './Overlay.js';
//import { getSuburbName } from '../geojson.js';
//import Dimensions from 'react-dimensions'

//import {json as requestJson} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWNlb2ZzcGllcyIsImEiOiJjajVvaDg0d2Q0MXJhMnFvODUzNjQ3MmZ5In0.xLzbJqDG59zkyw2CKEXaow'; // eslint-disable-line

// Source data GeoJSON
//const DATA_URL = 'https://raw.githubusercontent.com/Spice-Boys/Spice-Boys-Super-Secret-Project/master/public/datasets/ACT%20Division%20Boundaries.geojson'; // eslint-disable-line

const colorScale = r => [140, r * 255, 200 * (1 - r)];

const defaultViewport =  {
        latitude: -35.3,
        longitude: 149.1,
        zoom: 10,
        maxZoom: 16,
        pitch: 45,
        bearing: 0,
        height: 500,
        width: 500,
        mapStyle: "mapbox://styles/mapbox/outdoors-v9",
};

class Map extends Component {


    // Displays a GeoJSON polygonal file
    showGeoJSON(suburbs) {
        this.setState({data: suburbs});
    }

    showAllSuburbs() {
        this.showGeoJSON(this.state.suburbs);
    }

    hideSuburbs() {
        this.setState({data: null});
    }

    // Takes a dictionary, {"SUBURB": height} - heights should be in the hundreds
    setHeights(heights) {
        this.setState({heights: heights});
    }

    setColours(colours) {
        this.setState({colours: colours});
    }

    zoomIntoSuburb(suburb) {

    }

    getSuburbName(suburb) {
        return suburb.properties.division_name;
    }


    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                ...defaultViewport,
            },
            data: null
        };
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
        //this.showAllSuburbs();
        const {viewport, colours} = this.state;
        const data= this.props.data;
        const heights = this.props.heights;
        console.log(heights);
        const overlay = <Overlay viewport={viewport}
                                 data={data}
                                 colorScale={colorScale}
                                 heights={heights}
                                 colours={colours}
        />;
        return (
            <div className="map" ref="mapBox">
                <MapGL
                    {...viewport}
                    onViewportChange={this._onViewportChange.bind(this)}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                >
                    {overlay}
                </MapGL>
            </div>
        );
    }
}

export default Map