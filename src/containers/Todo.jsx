import './Todo.scss'
import { useState } from 'react';
import AddCard from '../components/AddCard';
import List from '../components/List';

function Todo() {
  const [data, setData] = useState([]);

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
  const status = [
    {
      title: 'Todo',
      value: 'todo'
    },
    {
      title: 'Done',
      value: 'done'
    },
    // {
    //   title: 'X',
    //   value: 'delete'
    // },
  ];
  return (
    <section className='todo'>
      {/* ganti ke div title nya */}
      <h1 className='todo__header'>Todo List</h1>
      <div className="todo__canvas">
        {status.map((item, id) => (
          <section key={id} className='todo__card'>
            <h2 className='todo__card__title'>{item.title}</h2>
            {data.length > 0 &&
              <ul className='todo__list'>
                {data.filter(el => el.status === status[id].value).map(list => (
                  <List
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
      </div>
    </section>
  )
}

export default Todo