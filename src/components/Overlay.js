import React, {Component} from 'react';
import {setParameters} from 'luma.gl';
import DeckGL, {GeoJsonLayer} from 'deck.gl';
import { Map, fromJS } from 'immutable';


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
        if (heights) {
            // console.log("showing "+name + ": " + heights[name]);
            return heights[name];
        }
        return 1;
    }

    render() {
        const {viewport, data, colorScale} = this.props;

        if (!data) {
            return null;
        }

        const newdata = JSON.parse(JSON.stringify(data));
        //console.log(this.props.heights);
        const heights = fromJS(this.props.heights);

        const layer = new GeoJsonLayer({
            id: 'geojson',
            data: newdata,
            opacity: 0.7,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            fp64: true,
            getElevation: f => this.getHeight(f.properties.division_name),
            getFillColor: f => colorScale(this.getHeight(f.properties.division_name)/10000),
            getLineColor: f => [255, 255, 255],
            lightSettings: LIGHT_SETTINGS,
            pickable: Boolean(this.props.onHover),
            onHover: this.props.onHover,
            updateTriggers: {
                getElevation: heights
            }
        });

        return (
            <DeckGL {...viewport} layers={ [layer] } onWebGLInitialized={this._initialize} />
        );
    }
}
