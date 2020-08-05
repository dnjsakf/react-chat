/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
`;

/* Main Component */
const Templates = props => {
  /* Props */
  const {
    ..rest
  } = props;
 
  /* Renderer */
  return (
    <Container>
      Templates
    </Container>
  );
}

/* Main Component Settings */
Templates.propTypes = { }
Templates.defaultProps = { }

/* Exports */
export default Templates;