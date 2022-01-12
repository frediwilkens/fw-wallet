import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const {
      id, labelName,
      onChange, name,
      value, options } = this.props;

    return (
      <label htmlFor={ id }>
        { labelName }
        <select
          name={ name }
          id={ id }
          required
          onChange={ onChange }
          value={ value }
          data-testid={ id }
          className="wallet-input"
        >
          { options.map((option, index) => (
            <option
              key={ index }
              value={ option }
              className="wallet-input"
            >
              { option }
            </option>
          ))}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
