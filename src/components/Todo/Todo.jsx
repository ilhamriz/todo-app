import './Todo.scss'
import { useState } from 'react';
import AddCard from '../components/AddCard';
import AddList from '../components/AddList';
import Card from '../components/Card';

function Todo() {
  const [status, setStatus] = useState([]);
  const [data, setData] = useState([]);

  function handleAddList(list) {
    let newList = {
      title: list,
      value: list
    };

    setStatus([...status, newList]);
  };

  const handleAddTodo = (input, status) => {
    let idData=0;
    if (!data.length) {
      idData=1;
    }
    else{
      idData = data[data.length - 1].id + 1;
    }

    let newData = {
      id: idData,
      name: input,
      status: status
    }

    setData([...data, newData]);
  }
  // console.log('data => ', data);

  const handleSelectDropdown = (select, id) => {
    const index = data.findIndex(el => el.id === id);
    let tempArray = [...data];
    tempArray[index].status = select;
    setData(tempArray);

    if (select === 'delete') {
      handleDeleteData(index);      
    }
  }

  const handleEditData = (task, id) => {
    const index = data.findIndex(el => el.id === id);
    let tempArray = [...data];
    tempArray[index].name = task;
    setData(tempArray)
  }

  const handleDeleteData = (index) => {
    let tempArray = [...data];
    tempArray.splice(index, 1);
    setData(tempArray);
  }

  return (
    <div className='todo'>
      {/* ganti titlenya ke div */}
      <div className='todo__header'>Todo List</div>
      <div className="todo__canvas">
        {status.map((item, id) => (
          <section key={id} className='todo__list'>
            <h2 className='todo__list__title'>{item.title}</h2>
            {data.length > 0 &&
              <ul className='todo__card'>
                {data.filter(el => el.status === status[id].value).map(list => (
                  <Card
                    key={list.id}
                    list={list}
                    status={status}
                    handle={(select)=>handleSelectDropdown(select, list.id)}
                    handleEdit={(task)=>handleEditData(task, list.id)}
                  />
                ))}
              </ul>
            }

            {/* Untuk nambah card per kolom */}
            <AddCard status={item.value} handleAddTodo={handleAddTodo} listData={data} />
          </section>
        ))}

        <AddList list={status} handleAddList={handleAddList} />
      </div>
    </div>
  )
}

export default Todo