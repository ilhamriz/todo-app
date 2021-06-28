import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import './ListHeader.scss';

function ListHeader({list, handleEditList, handleOpenAddCard, handleDeleteAllData, handleDeleteList}) {
  const formRef = useRef();
  const inputRef = useRef();
  const headerRef = useRef();
  const popRef = useRef();
  const extraRef = useRef();

  const [input, setInput] = useState(list.title);
  const [isFocus, setIsFocus] = useState(false);
  const [isPop, setIsPop] = useState(false);

  const submitTest = (event) => {
    event.preventDefault();
    handleEditList(list.id, input);
    inputRef.current.blur();
  }

  function handleAction(action) {
    setIsPop(false);

    switch (action) {
      case 'add_card':
        handleOpenAddCard(list.id);
        break;    
      case 'delete_all_card':
        handleDeleteAllData(list.id);
        break;    
      default:
        handleDeleteList(list.id);
        break;
    }
  }

  useEffect(() => {
    setInput(list.title);
  }, [list])

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

  useEffect(() => {
    if (isPop) {
      function handleClickOutside(event) {
        if ((popRef.current && !popRef.current.contains(event.target)) && (extraRef.current && !extraRef.current.contains(event.target))) {
          setIsPop(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }
  }, [isPop]);

  return (
    <>
    <div className="list-header" ref={headerRef}>
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

      {isPop && (
        <div className="pop-over" ref={popRef}>
          <div className="pop-over__header">
            <span className="pop-over__header__title">List actions</span>
            <button type='button' className='pop-over__header__close' onClick={()=>setIsPop(false)}>
              <svg className='close__icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="pop-over__content">
            <ul className="pop-over__list">
              <li>
                <button className='pop-over__item' onClick={()=>handleAction('add_card')}>
                  Add card...
                </button>
              </li>
            </ul>
            <ul className="pop-over__list">
              <li>
                <button className='pop-over__item' onClick={()=>handleAction('delete_all_card')}>
                  Archive all cards in this list...
                </button>
              </li>
            </ul>
            <ul className="pop-over__list">
              <li>
                <button className='pop-over__item' onClick={()=>handleAction('delete_list')}>
                  Archive this list
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

ListHeader.propTypes = {
  list: PropTypes.object,
  handleEditList: PropTypes.func,
  handleOpenAddCard: PropTypes.func,
  handleDeleteAllData: PropTypes.func,
  handleDeleteList: PropTypes.func
}

export default ListHeader