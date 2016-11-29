import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

const Header = () => {
  return (
  <nav>
    <IndexLink to="/" activeClassName="active">Home</IndexLink>
    {" | "}
    <Link to="/devices" activeClassName="active">Devices</Link>
    {" | "}
    <Link to="/courses" activeClassName="active">Course</Link>
    {" | "}
    <Link to="/about" activeClassName="active">About</Link>
    {<LoadingDots interval={100} dots={20}/>}
  </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
