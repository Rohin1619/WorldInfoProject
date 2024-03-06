import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for the header bar.
 * Title will be in a h1 element, and can be a component or string.
 */
const Header = props => {
    const { title } = props;
    return (
        <header id="header">
            <h1>{title}</h1>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};

export default Header;