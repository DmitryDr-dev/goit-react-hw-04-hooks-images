import PropTypes from 'prop-types';

import './Button.css';

export function Button({ onClick }) {
  return (
    <button className="Button" type="button" onClick={onClick}>
      Load More
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
