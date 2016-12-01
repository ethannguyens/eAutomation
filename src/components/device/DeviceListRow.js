import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const DeviceListRow = ({device}) => {
  return (
    <tr>
      <td><a href={device.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/device/' + device.id}>{device.title}</Link></td>
      <td>{device.authorId}</td>
      <td>{device.category}</td>
      <td>{device.length}</td>
    </tr>
  );
};

DeviceListRow.propTypes = {
  device: PropTypes.object.isRequired
};

export default DeviceListRow;
