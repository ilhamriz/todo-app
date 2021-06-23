import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import autosize from 'autosize';
import Button from '../../Button';

function AddCardForm({isAddOpen, setIsAddOpen, handleAddData, list}) {
  const inputRef = useRef(null);
  const addRef = useRef(null);
  const [input, setInput] = useState('');

  function handleSubmit(event) {
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
      {isAddOpen && (
        <>
          <form className="todo__add__form" onSubmit={handleSubmit}>
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
      )}
    </>
  )
}

AddCardForm.propTypes = {
  isAddOpen: PropTypes.bool,
  setIsAddOpen: PropTypes.bool,
  handleAddData: PropTypes.func,
  list: PropTypes.string
}

export default AddCardForm
