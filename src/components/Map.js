import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import {defaultMapStyle, dataLayer} from '../map-style.js';
import {fromJS} from 'immutable';
import {json as requestJson} from 'd3-request';

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
            mapStyle: defaultMapStyle,
			height: 400,
			width: 400,
            latitude: 40,
            longitude: -100,
            viewport: {
                latitude: -35.3,
                longitude: 149.1,
                zoom: 10,
                bearing: 0,
                pitch: 0,
            }
		}
	}

    componentDidMount() {
        window.addEventListener('resize', this._resize);
        this._resize();
        
        requestJson(document.location.href + '/datasets/ACT Division Boundaries.geojson', (error, response) => {
            if (!error) {
                this._loadData(response);
            }
        });
    }

    _loadData = data => {

        //updatePercentiles(data, f => f.properties.income[this.state.year]);
        const mapStyle = defaultMapStyle
        // Add geojson source to map
            .setIn(['sources', 'suburbs'], fromJS({type: 'geojson', data}))
            // Add point layer to map
            .set('layers', defaultMapStyle.get('layers').push(dataLayer));

        this.setState({data, mapStyle});
    };

    updatePercentiles = (featureCollection, accessor) => {
        const {features} = featureCollection;
        const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
        features.forEach(f => {
            const value = accessor(f);
            f.properties.value = value;
            f.properties.percentile = scale(value);
        });
    };



    _resize = () => {
        this.setState({
                width: this.refs.mapBox.clientWidth,
                height: this.refs.mapBox.clientHeight
        });
    };

  render() {
      const {viewport, mapStyle} = this.state;
    return (
			<div ref="mapBox" className="map">
				<MapGL
                    {...viewport}
					width={this.state.width}
					height={this.state.height}
					mapboxApiAccessToken={'pk.eyJ1IjoiYWNlb2ZzcGllcyIsImEiOiJjajVvaDg0d2Q0MXJhMnFvODUzNjQ3MmZ5In0.xLzbJqDG59zkyw2CKEXaow'}
                    mapStyle={mapStyle}
					onViewportChange={this.onViewportChange}
					{...viewport}
				/>
			</div>
    );
  }

	onViewportChange = viewport => this.setState({ viewport });
}

export default Map;
