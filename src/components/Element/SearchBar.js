import React, { useState } from "react";
import { useMall } from "../../contexts/MallContext";
import { Form, InputGroup, Button } from "react-bootstrap";

const SearchBar = ({ datalist }) => {
  const [result, setResult] = useState("");
  const {
    MallState: { allItems },
    getItems,
  } = useMall();

  const onChangeSearchBar = async (event) => {
    event.preventDefault();
    setResult(event.target.value);
  };

  const onSearch = async (result) => {
    await getItems(result);
    console.log(allItems);
  };

  return (
    <div>
      <div className="bg-light searchArea shadow-sm p-3 mb-5 rounded mt-3">
        <InputGroup>
          <Form.Control
            type="search"
            autoComplete="off"
            placeholder="Which product would you like to search"
            onChange={onChangeSearchBar}
            list="datalistOptions"
          />
          <datalist id="datalistOptions">
            {datalist.map((item, index) => (
              <option value={item} key={index} />
            ))}
          </datalist>
          <Button onClick={onSearch.bind(this, result)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default SearchBar;
