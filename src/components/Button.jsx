import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { labelName, onClick } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        className="btn"
      >
        { labelName }
      </button>
    );
  }
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
};
