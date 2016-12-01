import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as deviceActions from '../../actions/deviceActions';
import DeviceForm from './DeviceForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageDevicePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      device: Object.assign({}, props.device),
      errors: {},
      saving: false
    };

    this.updateDeviceState = this.updateDeviceState.bind(this);
    this.saveDevice = this.saveDevice.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.device.id != nextProps.device.id) {
      // Necessary to populate form when existing device is loaded directly.
      this.setState({device: Object.assign({}, nextProps.device)});
    }
  }

  updateDeviceState(event) {
    const field = event.target.name;
    let device = this.state.device;
    device[field] = event.target.value;
    return this.setState({device: device});
  }

  deviceFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.device.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  saveDevice(event) {
    event.preventDefault();

    if (!this.deviceFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveDevice(this.state.device)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Device saved');
    this.context.router.push('/devices');
  }

  render() {
    return (
      <DeviceForm
        allAuthors={this.props.authors}
        onChange={this.updateDeviceState}
        onSave={this.saveDevice}
        device={this.state.device}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageDevicePage.propTypes = {
  device: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageDevicePage.contextTypes = {
  router: PropTypes.object
};

function getDeviceById(devices, id) {
  const device = devices.filter(device => device.id == id);
  if (device) return device[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const deviceId = ownProps.params.id; // from the path `/device/:id`

  let device = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (deviceId && state.devices.length > 0) {
    device = getDeviceById(state.devices, deviceId);
  }

  return {
    device: device,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(deviceActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDevicePage);
