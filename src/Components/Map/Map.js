import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import { Searcher } from '../Searcher/Searcher';

const API_KEY = 'AIzaSyB4okjTTnndv_nqIU75IB54R2PZFfy1tVw';
console.log(API_KEY)
Geocode.setApiKey(API_KEY);

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			}
		}
	}

	onPlaceSelected = (place) => {
		if (!place.geometry) {
			return false;
		}
		const
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		this.setState({
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};


	render() {
		const CustomMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap google={this.props.google}
						defaultZoom={this.props.zoom}
						defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
					>
						<Marker google={this.props.google}
							position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
						<Searcher
							onPlaceSelected={this.onPlaceSelected}
							types={['(regions)']}
						/>
					</GoogleMap>
				)
			)
		);
		let map;
		if (this.props.center.lat !== undefined) {
			map = <div>
				<CustomMap
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
					loadingElement={
						<div style={{ height: `100%` }} />
					}
					containerElement={
						<div style={{ height: this.props.height }} />
					}
					mapElement={
						<div style={{ height: `100%` }} />
					}
				/>
			</div>
		}
		return (map)
	}
}

export default Map
