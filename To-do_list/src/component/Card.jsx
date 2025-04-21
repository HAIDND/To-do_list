import { useEffect, useState } from "react";
import UpdateForm from "./UpdateForm";

function Card({ state, handleItem }) {
  // console.log(typeof todoList);

  const [isUpdate, setIsUpdate] = useState(false);

  function handleUpdateItem() {
    setIsUpdate(!isUpdate);
  }
  const handleDeleteItem = (value) => {
    handleItem({ type: "deleteItem", payload: value });
  };
  function handleState(id) {
    handleItem({ type: "setStatusItem", payload: id });
  }

  return (
    <>
      <li className="li-card">
        <input
          value={!state.status}
          checked={state.status}
          className="checkbox"
          type="checkbox"
          onClick={() => {
            handleState(state.id);
          }}
        />
        <p className={state.status ? "completed" : "incomplete"}>
          {state.content}
        </p>
        <button onClick={() => handleUpdateItem()}>U</button>

        <button
          type="button"
          onClick={() => {
            handleDeleteItem(state.id);
          }}
        >
          X
        </button>
      </li>
      {isUpdate && (
        <UpdateForm
          setIsUpdate={setIsUpdate}
          data={state}
          handleItem={handleItem}
        />
      )}
    </>
  );
}

export default Card;
