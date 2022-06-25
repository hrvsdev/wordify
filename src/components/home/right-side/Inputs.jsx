export function Title({ previewEditor, titleValue, setTitleValue }) {
  return previewEditor ? (
    titleValue.trim() ? (
      <div className="title">{titleValue}</div>
    ) : (
      <div className="untitle">Untitled note</div>
    )
  ) : (
    <input
      type="text"
      placeholder="Enter note title"
      value={titleValue}
      onChange={(e) => {
        setTitleValue(e.target.value);
      }}
    />
  );
}

export function Category({ previewEditor, categoryValue, setCategoryValue }) {
  return previewEditor ? (
    categoryValue.trim() ? (
      <div className="category">{categoryValue}</div>
    ) : (
      <div className="uncategorized">Uncategorized</div>
    )
  ) : (
    <input
      type="text"
      placeholder="Enter category here"
      value={categoryValue}
      onChange={(e) => {
        setCategoryValue(e.target.value);
      }}
    />
  );
}
