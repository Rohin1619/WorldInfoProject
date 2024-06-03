import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ title }) => {
    return (
      <Box sx={{ padding: '10px 0'}}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      </Box>
    );
  };
  
Header.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};

export default Header;