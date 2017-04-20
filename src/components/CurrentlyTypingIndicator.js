import React, { Component, PropTypes } from 'react';
import styled, { withTheme } from 'styled-components';
import Loader from 'halogen/PulseLoader';

const Indicator = styled.div`
  text-align: right;
  display: block;
`;

class CurrentlyTypingIndicator extends Component {
  static propTypes = {
    theme: PropTypes.shape({
      primary: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    if (this.node.scrollIntoView) {
      this.node.scrollIntoView();
    }
  }

  setRef(node) {
    this.node = node;
  }

  render() {
    return (
      <Indicator innerRef={ this.setRef }>
        <Loader color={ this.props.theme.primary } size="6px" margin="4px" />
      </Indicator>
    );
  }
}

export { CurrentlyTypingIndicator as UnwrappedCurrentlyTypingIndicator };

export default withTheme(CurrentlyTypingIndicator);
