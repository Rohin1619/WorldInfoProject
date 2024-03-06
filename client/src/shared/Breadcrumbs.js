import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';


/**
 * Handles creation of breadcrumb links in the header bar for nested routes.
 * Provide an ordered array of objects (see propTypes.crumbs below) to render as breadcrumbs. If path is provided,
 * the breadcrumb will be a link, otherwise just text.
 */

const BreadCrumbs = ({ crumbs }) => {
    const crumbLength = crumbs.length;
    return (
        <React.Fragment>
            {crumbs.map((c, i) => (
                <React.Fragment key={`${c.title}f1`}>
                    {c.path ? (
                        <Link
                            key={`${c.title}l`}
                            to={c.state ? { pathname: c.path, state: c.state } : c.path}
                        >
                            {c.title}
                        </Link>
                    ) : (
                        <span key={`${c.title}s`}>{c.title}</span>
                    )}
                    {crumbLength !== i + 1 && (
                        <React.Fragment key={`${c.title}f2`}>
                            {` `}
                            <FontAwesomeIcon key={`${c.title}i`} icon={faAngleDoubleRight} />
                            {` `}
                        </React.Fragment>
                    )}
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};

BreadCrumbs.propTypes = {
    crumbs: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string,
            title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
            state: PropTypes.shape({}) // State to pass through link
        })
    ).isRequired
};

export default BreadCrumbs;