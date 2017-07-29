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
        window.addEventListener('resize', this._resize);
        this._resize();
    }

    _resize = () => {
        this.setState({
                width: this.refs.mapBox.clientWidth,
                height: this.refs.mapBox.clientHeight
        });
    };

  render() {
		const {viewport} = this.state;
    return (
			<div ref="mapBox" className="map">
				<MapGL
					width={this.state.width}
					height={this.state.height}
					latitude={-35.3}
					longitude={149.1}
					zoom={10}
					mapboxApiAccessToken={'pk.eyJ1IjoiYWNlb2ZzcGllcyIsImEiOiJjajVvaDg0d2Q0MXJhMnFvODUzNjQ3MmZ5In0.xLzbJqDG59zkyw2CKEXaow'}
					mapStyle="mapbox://styles/mapbox/dark-v9"
					onViewportChange={this.onViewportChange}
					{...viewport}
				/>
			</div>
    );
  }

	onViewportChange = viewport => this.setState({ viewport });
}

export default Map;