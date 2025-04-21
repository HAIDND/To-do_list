import { useEffect, useRef, useState } from "react";

function UpdateForm({ data, handleItem, setIsUpdate }) {
  const inputRef = useRef();
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = data.content || "";
      setIsDisable(inputRef.current.value.trim() === "");
    }
  }, [data]);

  return (
    <div id="formPopup" className="formUpdate">
      <div className="formBox">
        <label>Content:</label>
        <input
          type="text"
          ref={inputRef}
          onChange={() => setIsDisable(inputRef.current.value.trim() === "")}
        />
        <div className="buttonGroup">
          <button
            disabled={isDisable}
            onClick={() => {
              const newValue = inputRef.current.value.trim();
              if (newValue !== "") {
                handleItem({
                  type: "updateItem",
                  payload: { id: data.id, content: newValue },
                });
                setIsUpdate(false);
              }
            }}
          >
            Update
          </button>
          <button onClick={() => setIsUpdate(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateForm;
