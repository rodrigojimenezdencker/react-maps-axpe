import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import { Searcher } from '../Searcher/Searcher';
import { connect } from "react-redux";
import { addMarker } from '../../actions';

const API_KEY = 'AIzaSyB4okjTTnndv_nqIU75IB54R2PZFfy1tVw';
console.log(API_KEY)
Geocode.setApiKey(API_KEY);

const mapStateToProps = state => {
	return {
		markers: state.markers
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addMarker: (Marker) => dispatch(addMarker(Marker))
	}
}

class connectedMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapPosition: {
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
		this.props.addMarker({ lat: latValue, lng: lngValue })
		this.setState({
			mapPosition: {
				lat: latValue,
				lng: lngValue
			}
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
						{this.props.markers.map(marker =>
							<Marker google={this.props.google}
								draggable={false}
								position={{ lat: marker.lat, lng: marker.lng }}
							/>
						)}
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

const Map = connect(mapStateToProps, mapDispatchToProps)(connectedMap);
export default Map
