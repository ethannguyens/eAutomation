import React, {PropTypes} from 'react';
import DeviceListRow from './DeviceListRow';

const DeviceList = ({devices}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
      </thead>
      <tbody>
      {devices.map(device =>
        <DeviceListRow key={device.id} device={device}/>
      )}
      </tbody>
    </table>
  );
};

DeviceList.propTypes = {
  devices: PropTypes.array.isRequired
};

export default DeviceList;
