import React, { Component } from 'react';
import Map from './Components/Map/Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        center={{ lat: 41.3922909, lng: 2.1655837 }}
        height='100vh'
        zoom={15}
      />
    );
  }
}

export default App;
