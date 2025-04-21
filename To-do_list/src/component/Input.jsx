import { useEffect, useRef, useState } from "react";

function Input({ state, handleAddNote }) {
  const [input, setInput] = useState();
  const inputRef = useRef();
  const handleSave = () => {
    if (inputRef.current.value !== "") {
      handleAddNote({
        type: "updateData",
        payload: inputRef.current.value,
      });
      inputRef.current.value = "";
    }
  };
  return (
    <>
      <input
        type="text"
        ref={inputRef}
        placeholder="Note..."
        onKeyPress={(e) => {
          if (e.key == "Enter") {
            handleSave();
          }
        }}
      />
      <button onClick={() => handleSave()}>Save Note</button>
    </>
  );
}

export default Input;
