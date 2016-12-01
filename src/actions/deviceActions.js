import * as types from './actionTypes';
import deviceApi from '../api/mockDeviceApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadDevicesSuccess(devices) {
  return { type: types.LOAD_DEVICES_SUCCESS, devices};
}

export function createDeviceSuccess(device) {
  return {type: types.CREATE_DEVICE_SUCCESS, device};
}

export function updateDeviceSuccess(device) {
  return {type: types.UPDATE_DEVICE_SUCCESS, device};
}

export function loadDevices() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return deviceApi.getAllDevices().then(devices => {
      dispatch(loadDevicesSuccess(devices));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveDevice(device) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return deviceApi.saveDevice(device).then(device => {
      device.id ? dispatch(updateDeviceSuccess(device)) :
        dispatch(createDeviceSuccess(device));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
