import PropTypes from 'prop-types';
import './MenuCard.scss';
import { useState } from 'react';
import { CSSTransition } from "react-transition-group";

function MenuCard({lists, handleMenuCard, currentList, menuTop}) {
  const [isOpenMove, setIsOpenMove] = useState(false);

  return (
    <div className="menu-list" style={{top: `${menuTop}px`}}>
      
      <div className='menu-list__item' onClick={()=>setIsOpenMove(!isOpenMove)}>
        <span className='menu-list__icon-wrapper'>
          <svg className='menu-list__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/></svg>
        </span>
        <span>Move</span>
      </div>

      {isOpenMove && (
        <>
          {lists.filter(el => el.id !== currentList).map(list => (
            <CSSTransition
              key={list.id}
              in={isOpenMove}
              appear={true}
              timeout={300}
              classNames="menu-fade"
            >
              <div key={list.id} className='menu-list__item--move' onClick={()=>handleMenuCard(list.id)}>
                {list.title}
              </div>
            </CSSTransition>
          ))}
        </>
      )}

      <div className='menu-list__item' onClick={()=>handleMenuCard('delete')}>
        <span className='menu-list__icon-wrapper'>
          <svg className='menu-list__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zM9 4v2h6V4H9z"/></svg>
        </span>
        <span>Delete</span>
      </div>
    </div>
  )
};

MenuCard.propTypes = {
  lists: PropTypes.array,
  handleMenuCard: PropTypes.func,
  currentList: PropTypes.number,
  menuTop: PropTypes.number,
}

export default MenuCard
