import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import autosize from "autosize";
import MenuCard from "../MenuCard";
import Button from "../Button";
import './Card.scss'
import PropTypes from 'prop-types';

function Card({ data, lists, handleMenuCard, handleEditData }) {
  // const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const listRef = useRef(null);

  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);

  useEffect(() => {
    setOffsetTop(listRef.current.offsetTop);
    setOffsetLeft(listRef.current.offsetLeft);
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [inputEdit, setInputEdit] = useState(data.name);
  const handleSubmitEdit = () => {
    handleEditData(inputEdit);
    setIsEdit(false);
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
      autosize(inputRef.current);

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

  return (
    <>
      <li className="todo__item" ref={listRef}>
        <div
          className="item__main"
          onClick={() => {
            setIsEdit(true);
          }}
        >
          <div className="item__task">{data.name}</div>
        </div>
        {isEdit && (
          <div className="item__edit">
            <form
              className="item__edit__card"
              onSubmit={() => handleSubmitEdit()}
              ref={modalRef}
              style={{ top: `${offsetTop}px`, left: `${offsetLeft}px` }}
            >
              <textarea
                className="item__edit__input"
                ref={inputRef}
                value={inputEdit}
                onChange={(e) => setInputEdit(e.target.value)}
              />

              <CSSTransition
                in={isEdit}
                appear={true}
                timeout={200}
                classNames="fade"
              >
                <MenuCard lists={lists} handleMenuCard={handleMenuCard} />
              </CSSTransition>

              <div>
                <Button type='submit'>Save</Button>
              </div>
            </form>
          </div>
        )}
      </li>
    </>
  );
};

Card.propTypes = {
  data: PropTypes.object,
  lists: PropTypes.array,
  handleMenuCard: PropTypes.func,
  handleEditData: PropTypes.func,
};

export default Card;
