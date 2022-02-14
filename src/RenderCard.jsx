import "./RenderCard.css";
import React, { useState, useEffect, useContext } from "react";
import pagination from "./pagination";
import { cartContext } from "./context/context";
const RenderCard = ({ datapass }) => {
  let pages = Math.ceil(datapass.length / 6);
  const { cartdata, setCart } = useContext(cartContext);
  let handleAddtoCART = (e) => {
    if (e.target.style["backgroundColor"] === "lightgreen") return;
    let key = +e.target.attributes[1].value;
    let { strMeal, strMealThumb } = datapass.find((val) => val.idMeal == key);
    let passtocart = {
      strMeal,
      key,
      strMealThumb,
      price: 100,
      cnt: 1,
      target: e.target,
    };
    setCart([passtocart, ...cartdata]);
    e.target.style["backgroundColor"] = "lightgreen";
  };
  let Nexthandlercount = () => {
    if (count.curr >= pages) return;
    setCount((prevstate) => {
      return {
        prev: prevstate.curr,
        curr: prevstate.next,
        next: prevstate.next + 1,
      };
    });
  };
  let Prevhandlercount = () => {
    setCount((prevstate) => {
      return {
        prev: prevstate.prev - 1,
        curr: prevstate.prev,
        next: prevstate.curr,
      };
    });
  };
  const [count, setCount] = useState({
    prev: -1,
    curr: 0,
    next: 1,
  });

  useEffect(() => {
    setCount({ prev: -1, curr: 0, next: 1 });
  }, [datapass]);

  let filterData = pagination(datapass, count.curr);
  return (
    <div className="paginationDiv">
      <div className="arrowIcon">
        {count.curr > 0 && (
          <button className="arrowleft" onClick={Prevhandlercount}>
            ◀PREV--{count.prev}
          </button>
        )}
        <button className="current">{count.curr}</button>
        {count.curr < pages - 1 && (
          <button className="arrowRight" onClick={Nexthandlercount}>
            {count.next}--NEXT▶
          </button>
        )}
      </div>
      <div className="cardContainer">
        {filterData &&
          filterData.map((val) => {
            return (
              <div className="card" key={val.idMeal}>
                <div className="imgdiv">
                  <img src={val.strMealThumb} alt="" />
                  <div
                    className="card-icon"
                    id={val.idMeal}
                    onClick={handleAddtoCART}
                  >
                    🛒
                  </div>
                </div>
                <div className="text">
                  <p>{val.strMeal}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default RenderCard;
