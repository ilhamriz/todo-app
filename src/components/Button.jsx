import "./Button.scss";

function Button({ children, type, btnCard }) {
  const typeButton = type ? type : "button";
  const classButton = btnCard ? "btn--primary btn--card" : "btn--primary";
  return (
    <button type={typeButton} className={classButton}>
      {children}
    </button>
  );
}

export default Button;
