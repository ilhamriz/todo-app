import './AddCard.scss'
import PropTypes from 'prop-types';

function AddCard({handleOpenAddCard, list, datas}) {
  return (
    <>
    {!list.isAddOpen &&
      <div className="todo__add">
        <div className="todo__add__open" onClick={()=>handleOpenAddCard(list.id)}>
          <svg className='plus__icon' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>

          {datas.some(el => el.listID === list.id) ? (
            <span>Add another card</span>
          ) : (
            <span>Add a card</span>
          )}
        </div>
      </div>
    }
    </>
  )
};

AddCard.propTypes = {
  list: PropTypes.object,
  datas: PropTypes.array,
  handleOpenAddCard: PropTypes.func,
};

export default AddCard;