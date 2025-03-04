/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import autosize from "autosize";
import Button from "../../Button";
import "./AddCardForm.scss";
import { SnackbarContext } from "../../../Provider/snackbar-provider";

function AddCardForm({ handleAddData, list, handleOpenAddCard }) {
  const { setSnackbar } = useContext(SnackbarContext);
  const inputRef = useRef(null);
  const addRef = useRef(null);
  const [input, setInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const spaceRegex = /\s/g;
    if (!input.length || !input.replace(spaceRegex, "")) {
      setSnackbar("Card must be filled out", "error");
      return;
    }

    if (input.length > 500) {
      setSnackbar("Your text is too long", "error");
      return;
    }

    handleAddData(input, list.id);
    setInput("");
    inputRef.current.focus();
    inputRef.current.style.height = "90px";
  }

  function handleClickOutside(event) {
    if (addRef.current && !addRef.current.contains(event.target)) {
      handleCloseCard();
    }
  }
  function handleCloseCard() {
    setInput("");
    handleOpenAddCard(list.id);
  }

  useEffect(() => {
    if (list.isAddOpen) {
      inputRef.current.focus();
      addRef.current.scrollIntoView({ behavior: "smooth" });
      autosize(inputRef.current);

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [list.isAddOpen]);

  return (
    <>
      {list.isAddOpen && (
        <form className="todo__add__form" ref={addRef} onSubmit={handleSubmit}>
          <textarea
            className="item__edit__input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a title for this card..."
          />
          <div className="add__button">
            <Button type="submit" btnCard>
              Add Card
            </Button>
            <button
              type="button"
              className="add__button--close"
              onClick={handleCloseCard}
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
        </form>
      )}
    </>
  );
}

AddCardForm.propTypes = {
  handleAddData: PropTypes.func,
  handleOpenAddCard: PropTypes.func,
  list: PropTypes.object,
};

export default AddCardForm;
