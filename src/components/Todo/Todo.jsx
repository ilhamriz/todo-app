import './Todo.scss'
import { useState } from 'react';
import AddCard from '../AddCard';
import AddCardForm from '../AddCard/AddCardForm';
import AddList from '../AddList';
import Card from '../Card';

function Todo() {
  const [lists, setLists] = useState([]);
  const [datas, setDatas] = useState([]);

  function handleAddList(list) {
    setLists([...lists, list]);
  };
  // console.log('lists => ', lists);

  const handleAddData = (input, list) => {
    let idData=0;
    if (!datas.length) {
      idData=1;
    }
    else{
      idData = datas[datas.length - 1].id + 1;
    }

    let newData = {
      id: idData,
      name: input,
      list: list
    }

    setDatas([...datas, newData]);
  }
  // console.log('datas => ', datas);

  const handleMenuCard = (select, id) => {
    const index = datas.findIndex(el => el.id === id);
    let tempArray = [...datas];
    tempArray[index].list = select;
    setDatas(tempArray);

    if (select === 'delete') {
      handleDeleteData(index);      
    }
  }

  const handleEditData = (task, id) => {
    const index = datas.findIndex(el => el.id === id);
    let tempArray = [...datas];
    tempArray[index].name = task;
    setDatas(tempArray)
  }

  const handleDeleteData = (index) => {
    let tempArray = [...datas];
    tempArray.splice(index, 1);
    setDatas(tempArray);
  }
  
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className='todo'>
      <div className='todo__header'>Todo List</div>
      <div className="todo__canvas">

        {lists.map((list, id) => (
          <section key={id} className='todo__list'>
            <h2 className='todo__list__title'>{list}</h2>
            {datas.length > 0 &&
              <ul className='todo__card'>
                {datas.filter(el => el.list === lists[id]).map(data => (
                  <Card
                    key={data.id}
                    data={data}
                    lists={lists}
                    handleMenuCard={(select)=>handleMenuCard(select, data.id)}
                    handleEditData={(task)=>handleEditData(task, data.id)}
                  />
                ))}

                <AddCardForm isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen} handleAddData={handleAddData} list={list} />
              </ul>
            }
            <AddCard list={list} handleAddData={handleAddData} datas={datas} />
          </section>
        ))}

        <AddList lists={lists} handleAddList={handleAddList} />
      </div>
    </div>
  )
}

export default Todo;