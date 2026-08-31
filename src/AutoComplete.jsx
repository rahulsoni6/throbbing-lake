import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const data = [
  "Apple",
  "Amazon",
  "Adobe",
  "Alphabet",
  "Microsoft",
  "Meta",
  "Netflix",
  "Nvidia",
  "Tesla",
  "Twitter",
];

const AutoComplete = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setsearchValue] = useState("");
  const [highlightedText, setHighlightedText] = useState(-1);
  const { searchedValue, loading } = useDebounce(searchValue, 500);
  const filteredValue = data.filter((i) =>
    i.toLowerCase().includes(searchedValue.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSelectedValue("");
    setsearchValue(e.target.value);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    setHighlightedText(-1);
  };

  const handleKeyDown = (e) => {
    if (!filteredValue.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedText((prev) =>
        prev < filteredValue.length - 1 ? prev + 1 : 0
      );
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedText((prev) =>
        prev > 0 ? prev - 1 : filteredValue.length - 1
      );
    }
    if (e.key === "Enter" && highlightedText >= 0) {
      handleSelect(filteredValue[highlightedText]);
    }
    if (e.key === "Escape") {
      setHighlightedText(-1);
    }
  };
  return (
    <div>
      <input
        value={selectedValue || searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {loading ? (
        <div>Loading...</div>
      ) : searchedValue && !selectedValue && filteredValue.length > 0 ? (
        <div style={{ border: "1px solid black" }}>
          {filteredValue.map((i,index) => (
            <div key={i}>
              <h4
                style={{
                  cursor: "pointer",
                  backgroundColor: highlightedText === index ? "red" : "",
                }}
                onClick={() => handleSelect(i)}
              >
                {i}
              </h4>
            </div>
          ))}
        </div>
      ) : (
        searchedValue && !selectedValue && <div>No Results Found!</div>
      )}
    </div>
  );
};

export default AutoComplete;
