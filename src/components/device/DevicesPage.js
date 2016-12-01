import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as deviceActions from '../../actions/deviceActions';
import DeviceList from './DeviceList';
import {browserHistory} from 'react-router';

class DevicesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddDevicePage = this.redirectToAddDevicePage.bind(this);
  }

  deviceRow(device, index) {
    return <div key={index}>{device.title}</div>;
  }

  redirectToAddDevicePage() {
    browserHistory.push('/device');
  }

  render() {
    const {devices} = this.props;

    return (
      <div>
        <h1>Devices</h1>
        <input type="submit"
               value="Add Device"
               className="btn btn-primary"
               onClick={this.redirectToAddDevicePage}/>
        <DeviceList devices={devices}/>
      </div>
    );
  }
}

DevicesPage.propTypes = {
  devices: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    devices: state.devices
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(deviceActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesPage);
