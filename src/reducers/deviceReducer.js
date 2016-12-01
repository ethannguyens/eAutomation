import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function deviceReducer(state = initialState.devices, action) {
  switch (action.type) {
    case types.LOAD_DEVICES_SUCCESS:
      return action.devices;

    case types.CREATE_DEVICE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.device)
      ];

    case types.UPDATE_DEVICE_SUCCESS:
      return [
        ...state.filter(device => device.id !== action.device.id),
        Object.assign({}, action.device)
      ];

    default:
      return state;
  }
}
