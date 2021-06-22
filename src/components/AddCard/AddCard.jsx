import { useEffect, useRef, useState } from "react";
import autosize from 'autosize';
import Button from '../Button';
import './AddCard.scss'
import PropTypes from 'prop-types';

function AddCard({handleAddData, list, datas}) {
  const inputRef = useRef(null);
  const addRef = useRef(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.length) {
      return;
    }
    handleAddData(input, list);
    setInput('');
    setIsAddOpen(false);
  }

  function handleClickOutside(event) {
    if (addRef.current && !addRef.current.contains(event.target)) {
      handleCloseCard();
    }
  }
  function handleCloseCard(){
    setInput('');
    setIsAddOpen(false);
  }
  // function handlePressEnter(event) {
  //   if (event.code === "Enter" || event.code === "NumpadEnter") {
  //     handleSubmit(event);
  //   }
  // }
  
  useEffect(() => {
    if (isAddOpen) {
      inputRef.current.focus();
      autosize(inputRef.current);

      document.addEventListener("mousedown", handleClickOutside);
      // document.addEventListener("keydown", handlePressEnter);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        // document.removeEventListener("keydown", handlePressEnter);
      }
    }
  }, [isAddOpen]);

  return (
    <>
    <div className="todo__add" ref={addRef}>
      {isAddOpen ? (
        <>
          <form className="todo__add__form" onSubmit={(e)=>{handleSubmit(e)}}>
            <textarea
              className='item__edit__input'
              ref={inputRef}
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              placeholder='Enter a title for this card...'
            />
            <div className='add__button'>
              <Button type='submit' btnCard>Add Card</Button>
              <button type='button' className='add__button--close' onClick={handleCloseCard}>
                <svg className='close__icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </form>
        </>
        ) : (
        <>
          <div className="todo__add__open" onClick={()=>setIsAddOpen(true)}>
            <svg className='plus__icon' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>

            {datas.some(el => el.list === list) ? (
              <span>Add another card</span>
            ) : (
              <span>Add a card</span>
            )}
          </div>
        </>
      )}
    </div>
    </>
  )
};

AddCard.propTypes = {
  list: PropTypes.string,
  datas: PropTypes.array,
  handleAddData: PropTypes.func,
};

export default AddCard;