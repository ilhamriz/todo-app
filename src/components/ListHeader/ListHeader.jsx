import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import './ListHeader.scss';

function ListHeader({list, handleEditList}) {
  const formRef = useRef();
  const inputRef = useRef();
  const extraRef = useRef();
  const [input, setInput] = useState(list.title);
  const [isFocus, setIsFocus] = useState(false);
  const [isPop, setIsPop] = useState(false);
  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);

  const submitTest = (event) => {
    event.preventDefault();
    handleEditList(list.id, input);
    inputRef.current.blur();
    // console.log(input);
  }

  function showPop() {
    console.log('pop');
    console.log(offsetTop);
    console.log(offsetLeft);
  }
  

  useEffect(() => {
    setOffsetTop(extraRef.current.offsetTop);
    setOffsetLeft(extraRef.current.offsetLeft);
  });

  useEffect(() => {
    if (isFocus) {
      function handleClickOutside(event) {
        if (formRef.current && !formRef.current.contains(event.target)) {
          // Untuk submit form melalui useRef
          formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          setIsFocus(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }
  }, [isFocus])

  return (
    <div className="list-header">
      <form className='list-header__form' ref={formRef} onClick={()=>setIsFocus(true)} onSubmit={submitTest}>
        <input
          className='list-header__input'
          value={input}
          ref={inputRef}
          onChange={(e)=>setInput(e.target.value)}
          autoComplete='off'
        />
      </form>
      <button type='button' className="list-header__extra" ref={extraRef} onClick={()=>setIsPop(!isPop)}>
        <svg className='list-header__extra__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
      </button>

      {isPop && <div className="pop-header"></div>}
    </div>
  )
}

ListHeader.propTypes = {
  list: PropTypes.object
}

export default ListHeader