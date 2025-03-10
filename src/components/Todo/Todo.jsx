import "./Todo.scss";
import { useEffect, useState } from "react";
import AddCard from "../AddCard";
import AddCardForm from "../AddCard/AddCardForm";
import AddList from "../AddList";
import Card from "../Card";
import ListHeader from "../ListHeader";
import ChangeBackground from "../ChangeBackground/ChangeBackground";
import { IconMenu } from "../shared/Icons";

function Todo() {
  const [lists, setLists] = useState([]);
  const [datas, setDatas] = useState([]);
  const [isChangeBg, setIsChangeBg] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("blue");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("lists"))) {
      setLists(JSON.parse(localStorage.getItem("lists")));
      setDatas(JSON.parse(localStorage.getItem("datas")));
      setBackgroundColor(localStorage.getItem("theme"));
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("datas", JSON.stringify(datas));
  }, [lists, datas]);

  useEffect(() => {
    localStorage.setItem("theme", backgroundColor);
  }, [backgroundColor]);

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
  }

  function handleEditList(id, newList) {
    const index = lists.findIndex((el) => el.id === id);
    let tempArray = [...lists];
    tempArray[index].title = newList;
    setLists(tempArray);
  }

  function handleDeleteList(id) {
    const index = lists.findIndex((el) => el.id === id);
    let tempArray = [...lists];

    handleDeleteAllData(tempArray[index].id);
    tempArray.splice(index, 1);
    setLists(tempArray);
  }

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
    const filtering = tempArray.filter((el) => el.listID === listID);
    filtering.forEach(() =>
      tempArray.splice(
        tempArray.findIndex((el) => el.listID === listID),
        1
      )
    );
    setDatas(tempArray);
  }

  function handleOpenAddCard(id) {
    const index = lists.findIndex((el) => el.id === id);
    let tempArray = [...lists];
    tempArray[index].isAddOpen = !tempArray[index].isAddOpen;
    setLists(tempArray);
  }

  const handleMenuCard = (select, id) => {
    const index = datas.findIndex((el) => el.id === id);
    let tempArray = [...datas];
    tempArray[index].listID = select;
    setDatas(tempArray);

    if (select === "delete") {
      handleDeleteData(index);
    }
  };

  function handleChangeBackground(event) {
    setBackgroundColor(event.target.value);
  }

  function handleResize() {
    window.innerWidth < 500 ? setIsMobile(true) : setIsMobile(false);
  }

  return (
    <div className={`todo theme--` + backgroundColor}>
      <div className="todo__header">
        <div className="todo__header__title">
          <div className="todo__header__name">Todo App</div>
          <span className="todo__header__credit">
            Made by{" "}
            <a
              className="credits__link"
              href="https://github.com/ilhamriz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ilhamriz
            </a>
          </span>
        </div>
        <button
          className="todo__header__menu"
          onClick={() => setIsChangeBg(!isChangeBg)}
        >
          <IconMenu className="todo__header__menu__icon" />
          {isMobile ? null : "Change background"}
        </button>
      </div>
      <div className="todo__canvas" id="todo__canvas">
        {lists?.map((list, index) => (
          <section key={list?.id} className="todo__list">
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
                .filter((el) => el.listID === lists[index].id)
                .map((data) => (
                  <Card
                    key={data.id}
                    datas={datas}
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

      <ChangeBackground
        isChangeBg={isChangeBg}
        setIsChangeBg={setIsChangeBg}
        handleChange={handleChangeBackground}
        backgroundColor={backgroundColor}
      />
    </div>
  );
}

export default Todo;
