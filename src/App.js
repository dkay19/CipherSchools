import "./App.css";
import Form from "./component/Form/Form";
import RecipeApp from "./RecipeApp";
import React, { useState, useContext } from "react";
import Portalmodal from "./component/Portalmodal/Portalmodal";
import LogContext, { cartContext } from "./context/context";

function App() {
  let { issubmi, setsubmit } = useContext(LogContext);
  const [modal, setModal] = useState(false);
  let { cartdata } = useContext(cartContext);

  return (
    <div style={{ height: "100%" }}>
      <Portalmodal showme={modal} setMod={setModal} datatrans={cartdata} />
      <div className="loginfo">
        <div className="logo">
          <h1>🥘Recipe-App🥙</h1>
        </div>
        {issubmi && (
          <div className="cart">
            <button className="BUKK" onClick={() => setModal(!modal)}>
              Cart🛒{cartdata.length}
            </button>
            <button onClick={() => setsubmit(!issubmi)}>Log-Out</button>
          </div>
        )}
      </div>

      <Form>
        <RecipeApp />
      </Form>

      <footer className="footer-distributed">
        <div className="footer-left">
          <p class="footer-company-name">Diwyanshu &copy; 2022❤</p>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>📚Recipe project Assignment</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
