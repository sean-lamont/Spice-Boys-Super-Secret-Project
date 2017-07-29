import React, { Component } from 'react';
import MapGL from 'react-map-gl';

class Map extends Component {
  render() {
    return (
			<div className="map">
				<MapGL
					width={400}
					height={400}
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
