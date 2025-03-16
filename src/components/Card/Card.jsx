/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import autosize from "autosize";
import MenuCard from "../MenuCard";
import Button from "../Button";
import "./Card.scss";
import PropTypes from "prop-types";
import { SnackbarContext } from "../../Provider/snackbar-provider";

function Card({ datas, data, lists, handleMenuCard, handleEditData }) {
  const { setSnackbar } = useContext(SnackbarContext);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const cardRef = useRef(null);

  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [menuTop, setMenuTop] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [inputEdit, setInputEdit] = useState(data.name);

  let element = document.getElementById("todo__canvas");

  useEffect(() => {
    handleCardPosition();
    element.addEventListener("scroll", handleCardPosition);

    return () => {
      element.removeEventListener("scroll", handleCardPosition);
    };
  }, []);

  useEffect(() => {
    // situation when a card deleted
    handleCardPosition();
  }, [datas]);

  function handleCardPosition() {
    setOffsetTop(cardRef.current.offsetTop);
    setOffsetLeft(cardRef.current.offsetLeft - element.scrollLeft);
  }

  function handleSubmitEdit(event) {
    event.preventDefault();
    const spaceRegex = /\s/g;
    if (!inputEdit.length || !inputEdit.replace(spaceRegex, "")) {
      setSnackbar("Card must be filled out", "error");
      return;
    }

    if (inputEdit.length > 500) {
      setSnackbar("Your text is too long", "error");
      return;
    }
    handleEditData(data.id, inputEdit);
    setIsEdit(false);
  }

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
      inputRef.current.select();
      autosize(inputRef.current);

      let inputHeight = inputRef.current.offsetHeight;
      let cardHeight = inputHeight + offsetTop + 52; // 52 is for Save button

      if (cardHeight > window.innerHeight) {
        let newOffsetTop = window.innerHeight - (inputHeight + 60);
        setOffsetTop(newOffsetTop);

        if (inputHeight > window.innerHeight) {
          setMenuTop(Math.abs(newOffsetTop) + 24);
        }
      }

      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setIsEdit(false);
          setInputEdit(data.name);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isEdit]);

  function handleClickCard() {
    if (!isEdit) {
      if (cardRef.current.offsetLeft - element.scrollLeft < 0) {
        cardRef.current.scrollIntoView();
        element.scrollLeft -= 16;
      }
      if (cardRef.current.offsetWidth + offsetLeft > window.innerWidth) {
        cardRef.current.scrollIntoView({ behavior: "smooth" });
        element.scrollLeft += 150;
      }

      setTimeout(() => {
        setIsEdit(true);
      }, 0);
    }
  }

  return (
    <li ref={cardRef}>
      <button type="button" className="todo__item" onClick={handleClickCard}>
        <div className="item__main">
          <div className="item__task">{data.name}</div>
        </div>
        {isEdit && (
          <div className="item__edit">
            <form
              className="item__edit__card"
              onSubmit={handleSubmitEdit}
              ref={modalRef}
              style={{ top: `${offsetTop}px`, left: `${offsetLeft}px` }}
            >
              <textarea
                className="item__edit__input"
                ref={inputRef}
                value={inputEdit}
                onChange={(e) => setInputEdit(e.target.value)}
              />

              <MenuCard
                lists={lists}
                handleMenuCard={handleMenuCard}
                currentList={data.listID}
                menuTop={menuTop}
              />

              <div>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
        )}
      </button>
    </li>
  );
}

Card.propTypes = {
  datas: PropTypes.array,
  data: PropTypes.object,
  lists: PropTypes.array,
  handleMenuCard: PropTypes.func,
  handleEditData: PropTypes.func,
};

export default Card;
