import React, { useEffect, useRef, useState } from 'react'
import './AddList.scss'
import autosize from 'autosize';
import Button from './Button';

function AddList({list}) {
  const inputRef = useRef(null);
  const addRef = useRef(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.length) {
      return;
    }
    // handleAddTodo(input, status);
    // setInput('');
    // setIsAddOpen(false);
  }

  function handleClickOutside(event) {
    if (addRef.current && !addRef.current.contains(event.target)) {
      handleCloseCard()
    }
  }
  function handleCloseCard() {
    setInput('');
    setIsAddOpen(false);
  }
  
  useEffect(() => {
    if (isAddOpen) {
      inputRef.current.focus();
      autosize(inputRef.current);

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }
  }, [isAddOpen]);

  return (
    <div className='todo__add-list' ref={addRef} onClick={()=>setIsAddOpen(true)}>
      {isAddOpen ? (
        <>
          <form className="todo__add__form" onSubmit={(e)=>{handleSubmit(e)}}>
            <input
              className='add-list__input'
              ref={inputRef}
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              placeholder='Enter a title for this card...'
            />
            <div className='add__button'>
              <Button type='submit' btnCard>Add List</Button>
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
          <div className="add-list__open">
            <svg className='plus__icon' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>

            {list.length ? (
              <span>Add another list</span>
            ) : (
              <span>Add a list</span>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default AddList
