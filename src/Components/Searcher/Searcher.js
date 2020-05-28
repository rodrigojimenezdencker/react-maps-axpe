import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import './Searcher.css';

export const Searcher = (props) => (
    <Autocomplete
        className="searcher"
        onPlaceSelected={props.onPlaceSelected}
        types={['(regions)']}
    />
)
