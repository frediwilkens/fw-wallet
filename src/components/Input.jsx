import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { id, labelText, type,
      name, placeholder, value,
      onChange, nameClass } = this.props;
    return (
      <label htmlFor={ id }>
        { labelText }
        {' '}
        <input
          data-testid={ id }
          type={ type }
          name={ name }
          placeholder={ placeholder }
          value={ value }
          onChange={ onChange }
          className={ nameClass }
          id={ id }
        />
      </label>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nameClass: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

Input.defaultProps = {
  placeholder: '',
};

export default Input;
