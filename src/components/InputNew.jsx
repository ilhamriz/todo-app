import { useEffect, useRef, useState } from "react";

function InputNew({handleAddTodo, status}) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    handleAddTodo(input, status);
    setInput('');
    setIsAddOpen(false);
  }

  return (
    <>
      {isAddOpen ? (
        <>
          <div className="todo__add">
            <input
              type="text"
              className="add__input"
              placeholder='Enter your todos'
              ref={inputRef}
              value={input}
              onChange={(e)=>setInput(e.target.value)}
            />
            <div>
              <button className='todo__btn--primary' onClick={()=>{handleSubmit()}}>Add New</button>
              <button className='todo__btn--secondary' onClick={()=>setIsAddOpen(false)}>Cancel</button>
            </div>
          </div>
        </>
        ) : (
        <>
          <div className="todo__add" onClick={()=>setIsAddOpen(true)}>
            <input type="text" ref={inputRef} hidden />
            + Add new
          </div>
        </>
      )}
    </>
  )
}

export default InputNew
