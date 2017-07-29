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
    return (
			<div ref="mapBox" className="map">
				<MapGL
					width={this.state.width}
					height={this.state.height}
					latitude={37.7577}
					longitude={-122.4376}
					zoom={8}
					mapboxApiAccessToken={'pk.eyJ1IjoiYWNlb2ZzcGllcyIsImEiOiJjajVvaDg0d2Q0MXJhMnFvODUzNjQ3MmZ5In0.xLzbJqDG59zkyw2CKEXaow'}
					onChangeViewport={viewport => {
						// Call `setState` and use the state to update the map.
					}}
				/>
			</div>
    );
  }
}

export default Map;
