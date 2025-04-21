import ListCard from "./ListCard";
import Option from "./Option";
import Input from "./Input";
import {
  getLocalData,
  updateLocalData,
  removeLocalData,
} from "../services/dataService";
import { useEffect, useReducer, useState } from "react";

const initialState = {
  data: [],
  option: "",
};

function reducer(state, action) {
  switch (action.type !== "") {
    case action.type === "setOption":
      return {
        ...state,
        data: getLocalData(action.payload),
        option: action.payload,
      };
    case action.type === "updateData":
      const id = Date.now().toString(36);
      updateLocalData(state.option, [
        ...state.data,
        { id: id, content: action.payload, status: false },
      ]);
      return {
        ...state,
        data: [
          ...state.data,
          { id: id, content: action.payload, status: false },
        ],
      };
    case action.type === "updateItem":
      const newData = state.data.map((i) => {
        if (i.id == action.payload.id) {
          return action.payload;
        }
        return i;
      });

      updateLocalData(state.option, newData);
      return { ...state, data: newData };
    case action.type === "setStatusItem":
      const newStatus = state.data.map((i) => {
        if (i.id == action.payload) {
          console.log({ ...i, status: !i.status });
          return { ...i, status: !i.status };
        }
        return i;
      });

      updateLocalData(state.option, newStatus);
      return { ...state, data: newStatus };
    case action.type === "deleteList":
      confirm(`Delete ${state.option}?`);
      removeLocalData(state.option);
      return { ...state, data: [] };
    case action.type === "deleteItem":
      const newList = confirm("Delete this note?")
        ? state.data.filter((i) => i.id !== action.payload)
        : state.data;
      updateLocalData(state.option, newList);
      return { ...state, data: newList };
    default:
      throw new Error("Unknow action");
  }
}
function BodyContent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //get data on mounted
  useEffect(() => {
    dispatch({ type: "setOption", payload: "TodoList" });
  }, []);

  useEffect(() => {
    document.title = state.option;
    return () => (document.title = "DND Note");
  }, [state]);

  return (
    <>
      <Option list={["TodoList", "Schedule", "Note"]} onSelected={dispatch} />
      <span>
        <Input state={state} handleAddNote={dispatch} />
        <button onClick={() => dispatch({ type: "deleteList" })}>
          Delele all note
        </button>
      </span>
      <h2>{state.option}</h2>
      <ListCard state={state} handleItem={dispatch} />
    </>
  );
}
export default BodyContent;
