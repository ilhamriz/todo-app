import PropTypes from 'prop-types';
import './MenuCard.scss';
import { useState } from 'react';
import { CSSTransition } from "react-transition-group";

function MenuCard({lists, handleMenuCard, currentList}) {
  const [isOpenMove, setIsOpenMove] = useState(false);

  return (
    <div className="menu-list">
      
      <div className='menu-list__item' onClick={()=>setIsOpenMove(!isOpenMove)}>
        <span className='menu-list__icon-wrapper'>
          <svg className='menu-list__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/></svg>
        </span>
        <span>Move</span>
      </div>

      {isOpenMove && (
        <>
          {lists.filter(el => el.title !== currentList).map(list => (
            <CSSTransition
              key={list.id}
              in={isOpenMove}
              appear={true}
              timeout={300}
              classNames="menu-fade"
            >
              <div key={list.id} className='menu-list__item--move' onClick={()=>handleMenuCard(list.title)}>
                {list.title}
              </div>
            </CSSTransition>
          ))}
        </>
      )}

      <div className='menu-list__item' onClick={()=>handleMenuCard('delete')}>
        <span className='menu-list__icon-wrapper'>
          <svg className='menu-list__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 10H2V4.003C2 3.449 2.455 3 2.992 3h18.016A.99.99 0 0 1 22 4.003V10h-1v10.001a.996.996 0 0 1-.993.999H3.993A.996.996 0 0 1 3 20.001V10zm16 0H5v9h14v-9zM4 5v3h16V5H4zm5 7h6v2H9v-2z"/></svg>
        </span>
        <span>Archive</span>
      </div>
    </div>
  )
};

MenuCard.propTypes = {
  lists: PropTypes.array,
  handleMenuCard: PropTypes.func,
}

export default MenuCard
