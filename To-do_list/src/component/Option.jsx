function Option({ list, onSelected }) {
  return (
    <>
      <select
        onChange={(e) =>
          onSelected({ type: "setOption", payload: e.target.value })
        }
      >
        {list.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    </>
  );
}

export default Option;
