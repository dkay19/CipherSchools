import React, { useState } from "react";
const Search = ({ handler }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="wrap">
      <div className="search">
        <input
          type="text"
          value={search}
          className="searchTerm"
          placeholder="Search cusine...."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="searchButton"
          onClick={() => {
            handler(search);
            setSearch("");
          }}
        >
          🔍
        </button>
      </div>
    </div>
  );
};
export default Search;
