import React, {Component} from 'react';
import {setParameters} from 'luma.gl';
import DeckGL, {GeoJsonLayer} from 'deck.gl';

const LIGHT_SETTINGS = {
    lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
    ambientRatio: 0.2,
    diffuseRatio: 0.5,
    specularRatio: 0.3,
    lightsStrength: [1.0, 0.0, 2.0, 0.0],
    numberOfLights: 2
};

export default class Overlay extends Component {

    _initialize(gl) {
        setParameters(gl, {
            depthTest: true,
            depthFunc: gl.LEQUAL
        });
    }

    getHeight(name) {
        const heights = this.props.heights;
        console.log(heights);
        if (heights && heights.indexOf(name) !== -1) {
            return this.heights[name];
        }
        return 0;
    }

    render() {
        const {viewport, data, colorScale} = this.props;

        if (!data) {
            return null;
        }

        var layer = new GeoJsonLayer({
            id: 'geojson',
            data,
            opacity: 0.8,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            fp64: true,
            getElevation: f => this.props.heights ? this.props.heights[f.properties.division_name] : 1,
            getFillColor: f => colorScale(f.properties.division_name.length/10),
            getLineColor: f => [255, 255, 255],
            lightSettings: LIGHT_SETTINGS,
            pickable: Boolean(this.props.onHover),
            onHover: this.props.onHover
        });

        return (
            <DeckGL {...viewport}  layers={ [layer] } onWebGLInitialized={this._initialize} />
        );
    }
}
