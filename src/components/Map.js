import React, { Component } from 'react';
import MapGL from 'react-map-gl';

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 400,
			width: 400
		}
	}

	componentDidMount() {
		const height = this.refs.mapBox.clientHeight;
		const width = this.refs.mapBox.clientWidth;
		this.setState({ height, width });
	}

  render() {
		const {viewport} = this.state;
    return (
			<div ref="mapBox" className="map">
				<MapGL
					width={this.state.width}
					height={this.state.height}
					latitude={-35.5202253}
					longitude={148.5205264}
					zoom={8}
					mapboxApiAccessToken={'pk.eyJ1IjoiYWNlb2ZzcGllcyIsImEiOiJjajVvaDg0d2Q0MXJhMnFvODUzNjQ3MmZ5In0.xLzbJqDG59zkyw2CKEXaow'}
					mapStyle="mapbox://styles/mapbox/satellite-v9"
					onViewportChange={this.onViewportChange}
					{...viewport}
				/>
			</div>
    );
  }

	onViewportChange = viewport => this.setState({ viewport });
}

export default Map;
