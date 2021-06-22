import "./Button.scss";
import PropTypes from 'prop-types';

function Button({ children, type, btnCard }) {
  const typeButton = type ? type : "button";
  const classButton = btnCard ? "btn--primary btn--card" : "btn--primary";
  return (
    <button type={typeButton} className={classButton}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  btnCard: PropTypes.bool,
};

export default Button;