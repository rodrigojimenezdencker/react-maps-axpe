import { ADD_MARKER } from '../constants';

const initialState = {
    markers: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MARKER:
            return {
                markers: state.markers.concat(action.payload)
            }
        default:
            return state;
    }
}

export default rootReducer;