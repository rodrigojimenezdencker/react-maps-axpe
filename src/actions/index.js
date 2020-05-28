import { ADD_MARKER } from '../constants';

export function addMarker(payload) {
    return { type: ADD_MARKER, payload };
  }