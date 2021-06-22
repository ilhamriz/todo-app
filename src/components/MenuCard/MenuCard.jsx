import PropTypes from 'prop-types';

function MenuCard({lists, handleMenuCard}) {
  return (
    <div className="dropdown__menu">
      {lists.map((stat, idx)=>(
        <div key={idx} className='dropdown__item' onClick={()=>handleMenuCard(stat)}>
          {stat}
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
