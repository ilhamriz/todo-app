import PropTypes from 'prop-types';
import './MenuCard.scss';

function MenuCard({lists, handleMenuCard}) {
  return (
    <div className="dropdown__menu">
      {lists.map(list => (
        <div key={list.id} className='dropdown__item' onClick={()=>handleMenuCard(list.title)}>
          {list.title}
        </div>
      ))}
      <div className='dropdown__item' onClick={()=>handleMenuCard('delete')}>
        Archive
      </div>
    </div>
  )
};

MenuCard.propTypes = {
  lists: PropTypes.array,
  handleMenuCard: PropTypes.func,
}

export default MenuCard
