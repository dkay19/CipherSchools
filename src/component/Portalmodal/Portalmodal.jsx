import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import "./Portalmodal.css";
import { cartContext } from "../../context/context";

export default function Portalmodal({ datatrans, showme, setMod }) {
  const { setCart } = useContext(cartContext);
  let total = datatrans.reduce(
    (tot, curr, idx) => (tot += curr.price * curr.cnt),
    0
  );

  let incHandle = (e) => {
    let key = +e.target.attributes[1].value;
    let currdata = datatrans.find((val) => val.key == key);
    currdata.cnt += 1;
    setCart([...datatrans]);
  };
  let decHandle = (e) => {
    let key = +e.target.attributes[1].value;
    let currdata = datatrans.find((val) => val.key == key);
    currdata.cnt -= 1;
    setCart([...datatrans]);
  };
  let delCart = (e) => {
    let key = +e.target.attributes[1].value;
    let newdata = datatrans.filter((val) => val.key != key);
    let currdata = datatrans.find((val) => val.key == key);
    // currdata.target;
    currdata.target.style["backgroundColor"] = "#c5c5c598";
    currdata.cnt = 1;
    setCart([...newdata]);
  };
  return createPortal(
    <>
      {showme && (
        <div className="backdrop">
          <div className="cartItems">
            <div className="title">
              <p>Cart</p>
              <button className="close-cart" onClick={() => setMod(false)}>
                ❌
              </button>
            </div>
            <div className="overslide">
              {datatrans.length > 0 &&
                datatrans.map((val) => (
                  <div className="items" key={val.key}>
                    <div className="img-with-text">
                      <div className="cartimg">
                        <img src={val.strMealThumb} alt="" />
                      </div>
                      <div className="text-cart">
                        <p>{val.strMeal}</p>
                      </div>
                    </div>
                    <div className="cross-count">
                      <div className="text-price">
                        <p>{val.price}</p>
                      </div>
                      <div className="count-cart">
                        <button
                          className="dec"
                          id={val.key}
                          onClick={decHandle}
                        >
                          ➖
                        </button>
                        <span className="show-count">{val.cnt}</span>
                        <button
                          className="inc"
                          id={val.key}
                          onClick={incHandle}
                        >
                          ➕
                        </button>
                      </div>
                      <div className="delete">
                        <button
                          className="del-cart-item"
                          id={val.key}
                          onClick={delCart}
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="total-container">
              <div className="total-cart">
                <span>total= 💲 </span>
                <span>{total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,

    document.getElementById("modal-root")
  );
}
