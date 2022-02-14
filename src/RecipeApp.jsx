import "./RecipeApp.css";
import Search from "./component/Search/Search";
import React, { useState, useEffect } from "react";
import RenderCard from "./RenderCard";
let dataRecipe = [];
const RecipeApp = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  let searchHandler = (searchva) => {
    if (!searchva || searchva === " ") return;
    setSearch(searchva);
  };
  // console.log(data);
  // www.themealdb.com/api/json/v1/1/categories.php
  useEffect(async () => {
    let datajson = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`
    );

    let { meals } = await datajson.json();
    // console.log(meals);
    if (meals != null) setData([...meals]);
    else setData([]);
  }, [search]);

  return (
    <>
      <Search handler={searchHandler} />
      <h1
        style={{
          color: "#8f3ea3e0",
          marginTop: "auto",
          width: "65%",
          textAlign: "center",
        }}
      >
        {data.length > 0
          ? search
          : "No data From Api Search for chicken, Pasta, Pork, Dessert.."}
      </h1>

      {data.length > 0 && <RenderCard datapass={data} />}
    </>
  );
};
export default RecipeApp;
