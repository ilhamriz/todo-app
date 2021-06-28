import "./Todo.scss";
import { useState } from "react";
import AddCard from "../AddCard";
import AddCardForm from "../AddCard/AddCardForm";
import AddList from "../AddList";
import Card from "../Card";
import ListHeader from "../ListHeader";

function Todo() {
  const [lists, setLists] = useState([]);
  const [datas, setDatas] = useState([]);

  console.log('lists => ',lists);
  console.log('datas => ',datas);

  function handleAddList(list) {
    let idList = 0;
    if (!lists.length) {
      idList = 1;
    } else {
      idList = lists[lists.length - 1].id + 1;
    }

    let newList = {
      id: idList,
      title: list,
      isAddOpen: false,
    };
    setLists([...lists, newList]);
  };

  function handleEditList(id, newList) {
    const index = lists.findIndex((el) => el.id === id);
    let tempArray = [...lists];
    tempArray[index].title = newList;
    setLists(tempArray);
  };

  function handleDeleteList(id) {
    const index = lists.findIndex((el) => el.id === id);
    let tempArray = [...lists];

    handleDeleteAllData(tempArray[index].id);
    tempArray.splice(index, 1);
    setLists(tempArray);
  };

  const handleAddData = (input, listID) => {
    let idData = 0;
    if (!datas.length) {
      idData = 1;
    } else {
      idData = datas[datas.length - 1].id + 1;
    }

    let newData = {
      id: idData,
      name: input,
      listID: listID,
    };

    setDatas([...datas, newData]);
  };

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

  function handleDeleteAllData(listID) {
    let tempArray = [...datas];
    const filtering = tempArray.filter(el => el.listID === listID);
    filtering.forEach(() => tempArray.splice(tempArray.findIndex(el => el.listID === listID), 1));
    setDatas(tempArray);
  };

  function handleOpenAddCard(id) {
    const index = lists.findIndex((el) => el.id === id);
    let tempArray = [...lists];
    tempArray[index].isAddOpen = !tempArray[index].isAddOpen;
    setLists(tempArray);
  };

  const handleMenuCard = (select, id) => {
    const index = datas.findIndex((el) => el.id === id);
    let tempArray = [...datas];
    tempArray[index].listID = select;
    setDatas(tempArray);

    if (select === "delete") {
      handleDeleteData(index);
    }
  };

  return (
    <div className="todo">
      <div className="todo__header">Todo List</div>
      <div className="todo__canvas">
        {lists.map((list, id) => (
          <section key={id} className="todo__list">
            <h2 className="hidden">{list.title}</h2>

            <ListHeader
              list={list}
              handleEditList={handleEditList}
              handleOpenAddCard={handleOpenAddCard}
              handleDeleteAllData={handleDeleteAllData}
              handleDeleteList={handleDeleteList}
            />

            <ul className="todo__card">
              {datas
                .filter((el) => el.listID === lists[id].id)
                .map((data) => (
                  <Card
                    key={data.id}
                    data={data}
                    lists={lists}
                    handleMenuCard={(select) => handleMenuCard(select, data.id)}
                    handleEditData={handleEditData}
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
