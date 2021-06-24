import "./Todo.scss";
import { useState } from "react";
import AddCard from "../AddCard";
import AddCardForm from "../AddCard/AddCardForm";
import AddList from "../AddList";
import Card from "../Card";
import ListHeader from '../ListHeader';

function Todo() {
  const [lists, setLists] = useState([]);
  const [datas, setDatas] = useState([]);

  function handleAddList(list) {
    let idData = 0;
    if (!lists.length) {
      idData = 1;
    } else {
      idData = lists[lists.length - 1].id + 1;
    }

    let newList = {
      id: idData,
      title: list,
      isAddOpen: false,
    };
    setLists([...lists, newList]);
  }
  console.log('lists => ', lists);

  function handleEditList(id, newList) {
    const index = lists.findIndex((el) => el.id === id);
    let tempArray = [...lists];
    tempArray[index].title = newList;
    setLists(tempArray);
  }

  function handleDeleteList(id) {
    const index = lists.findIndex((el) => el.id === id);
    let tempArray = [...lists];
    tempArray.splice(index, 1);
    setLists(tempArray);
  };

  const handleAddData = (input, list) => {
    let idData = 0;
    if (!datas.length) {
      idData = 1;
    } else {
      idData = datas[datas.length - 1].id + 1;
    }

    let newData = {
      id: idData,
      name: input,
      list: list,
    };

    setDatas([...datas, newData]);
  };
  // console.log('datas => ', datas);

  const handleEditData = (id, task) => {
    const index = datas.findIndex((el) => el.id === id);
    let tempArray = [...datas];
    tempArray[index].name = task;
    setDatas(tempArray);
  };
  
  const handleDeleteData = (index) => {
    let tempArray = [...datas];
    tempArray.splice(index, 1);
    setDatas(tempArray);
  };

  function handleOpenAddCard(id){
    const index = lists.findIndex((el) => el.id === id);
    let tempArray = [...lists];
    tempArray[index].isAddOpen = !tempArray[index].isAddOpen;
    setLists(tempArray);
  };

  const handleMenuCard = (select, id) => {
    const index = datas.findIndex((el) => el.id === id);
    let tempArray = [...datas];
    tempArray[index].list = select;
    setDatas(tempArray);

    if (select === "delete") {
      handleDeleteData(index);
    }
  };

  // const [input, setInput] = useState('');
  // function submitTest(event) {
  //   event.preventDefault();
  //   console.log('test');
  // }
  // const [isAddOpen, setIsAddOpen] = useState(false);
  // console.log('isAddOpen -> ',isAddOpen);
  // const [isHeaderEdit, setIsHeaderEdit] = useState(false);

  return (
    <div className="todo">
      <div className="todo__header">Todo List</div>
      <div className="todo__canvas">
        {lists.map((list, id) => (
          <section key={id} className="todo__list">
            <h2 className="hidden">{list.title}</h2>

            <ListHeader list={list} handleEditList={handleEditList} />

            {/* <div className="list__header">
              <form onSubmit={(e)=>submitTest(e)}>
                <input
                  className='list__header__input'
                  // value={input}
                  value={list.title}
                  onChange={(e)=>setInput(e.target.value)}
                  autoComplete='off'
                />
              </form>
              <div className="list__title" onClick={()=>setIsHeaderEdit(true)}>
                {list.title}
              </div>
              <button type='button' className="list__extras">
                <svg className='list__extras__icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </button>
            </div> */}
            
            <ul className="todo__card">
              {datas.filter((el) => el.list === lists[id].title).map((data) => (
                <Card
                  key={data.id}
                  data={data}
                  lists={lists}
                  handleMenuCard={(select) => handleMenuCard(select, data.id)}
                  handleEditData={handleEditData}
                  // handleEditData={(task) => handleEditData(task, data.id)}
                />
              ))}

              <AddCardForm
                list={list}
                handleAddData={handleAddData}
                handleOpenAddCard={handleOpenAddCard}
              />
            </ul>

            <AddCard
              list={list}
              datas={datas}
              handleOpenAddCard={handleOpenAddCard}
            />
          </section>
        ))}

        <AddList lists={lists} handleAddList={handleAddList} />
      </div>
    </div>
  );
}

export default Todo;
