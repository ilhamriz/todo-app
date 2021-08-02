import "./ChangeBackground.scss";

function ChangeBackground({ isChangeBg, setIsChangeBg, handleChange, backgroundColor }) {
  const listBackground = [
    "blue",
    "orange",
    "green",
    "red",
    "purple",
    "pink",
    "green-light",
    "blue-light",
    "gray",
  ];

  return (
    <>
      {isChangeBg && (
        <div className="change-bg">
          <div className="change-bg__header">
            <span className="change-bg__title">Colors</span>
            <button
              type="button"
              className="change-bg__close"
              onClick={() => setIsChangeBg(false)}
            >
              <svg
                className="close__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="change-bg__content">
            {listBackground.map((background, id) => (
              <div className="change-bg__wrapper" key={id}>
                <label className="container">
                  <input
                    type="radio"
                    name="background"
                    value={background}
                    onChange={handleChange}
                    checked={backgroundColor === background}
                  />
                  <span className={"checkmark theme--"+background}></span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ChangeBackground;
