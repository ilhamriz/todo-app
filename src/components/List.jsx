import React, { useEffect, useRef, useState } from 'react'
import { chevronDown } from '../assets'
import Dropdown from './Dropdown';
import autosize from 'autosize';

function List({list, status, handle, handleEdit}) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    autosize(inputRef.current);
  });

  const [isEdit, setIsEdit] = useState(false);
  const [inputEdit, setInputEdit] = useState(list.name);
  const handleSubmitEdit = () => {
    handleEdit(inputEdit);
    setIsEdit(false);
  }

  const hidden = isEdit ? 'item__task--hidden':'';
  const statusDone = list.status === 'done' ? 'item__task--done' : '';

  return (
    <>
      <li className='todo__item'>
        <div className="item__main" onClick={()=>{setIsEdit(true)}}>
          {/* <div className={`item__task ${hidden} ${statusDone}`}> */}
          <div className={`item__task ${statusDone}`}>
            {list.name}
          </div>
          {/* <textarea
            className='item__edit-input'
            ref={inputRef}
            value={inputEdit}
            onChange={(e)=>setInputEdit(e.target.value)}
            // rows={1}
            hidden={isEdit ? false:true}
          /> */}
          {/* {isEdit && <Dropdown status={status} handle={handle} />}
          {isEdit &&
            <div>
              <button className="todo__btn--primary" onClick={()=>handleSubmitEdit()}>
                Edit
              </button>
              <button className="todo__btn--secondary" onClick={()=>{setIsEdit(false); setInputEdit(list.name)}}>
                Cancel
              </button>
            </div>
          }        */}
          
          
          {/* <button className="item__dropdown" onClick={()=>setIsOpen(!isOpen)}>
            <div className="dropdown__icon">
              <img src={chevronDown} alt="" />
            </div>
            {isOpen && <Dropdown status={status} handle={handle} />}
          </button> */}
        </div>        
        <div className="item__edit-modal" hidden={isEdit ? false : true}>
          <textarea
            className='item__edit-input'
            ref={inputRef}
            value={inputEdit}
            onChange={(e)=>setInputEdit(e.target.value)}
            // rows={1}
            // hidden={isEdit ? false:true}
          />

          <Dropdown status={status} handle={handle} />

          <div>
            <button className="todo__btn--primary" onClick={()=>handleSubmitEdit()}>
              Edit
            </button>
            <button className="todo__btn--secondary" onClick={()=>{setIsEdit(false); setInputEdit(list.name)}}>
              Cancel
            </button>
          </div>
        </div>
      </li>
    </>
  )
}

export default List
