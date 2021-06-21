import { useEffect, useRef, useState } from "react";
import autosize from 'autosize';
import Button from './Button';

function AddCard({handleAddTodo, status, listData}) {
  const inputRef = useRef(null);
  const addRef = useRef(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.length) {
      return;
    }
    handleAddTodo(input, status);
    setInput('');
    setIsAddOpen(false);
  }

  function handleClickOutside(event) {
    if (addRef.current && !addRef.current.contains(event.target)) {
      setInput('');
      setIsAddOpen(false);
    }
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
            <div>
              <Button type='submit' btnCard>Add Card</Button>
            </div>
          </form>
        </>
        ) : (
        <>
          <div className="todo__add__open" onClick={()=>setIsAddOpen(true)}>
            {listData.some(el => el.status === status) ? (
              <span>+ Add another card</span>
            ) : (
              <span>+ Add a card</span>
            )}
          </div>
        </>
      )}
    </div>
    </>
  )
}

export default AddCard
