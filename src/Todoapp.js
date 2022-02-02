import { useState } from "react";
import "./todo.css";
function Todoapp() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  let handlefilter = (options) => {
    setFilter(options);
  };
  let filteritem = data.filter((val) => val[filter] === true);
  if (filter === "uncomplete")
    filteritem = data.filter((val) => val["complete"] === false);

  return (
    <div className="all-todo">
      <Todoform setData={setData} />
      <Filter onchange={handlefilter} />
      <TodoList data={filteritem} data1={data} setData={setData} />
    </div>
  );
}

function Todoform({ setData }) {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  let handleSearch = (e) => {
    setSearch(e.target.value);
  };
  let handleDate = (e) => {
    setDate(e.target.value);
  };
  let handleSubmit = (e) => {
    e.preventDefault();

    setDate(e.target.elements[1].value);
    let obj = {
      id: Math.floor(Math.random() * 1000 + 1),
      value: search,
      date: date,
      all: true,
      complete: false,
      star: false,
    };
    setData((prevdata) => {
      return [...prevdata, obj];
    });
    setSearch("");
    setDate(new Date().toISOString().split("T")[0]);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={search} onChange={handleSearch} type="text" id="search" />
      <input value={date} onChange={handleDate} type="date" id="date" />
      <button type="submit">ADD</button>
    </form>
  );
}
const style = {};
function TodoList({ data, setData, data1 }) {
  const [color, setCOL] = useState("grey");
  function handelete(e) {
    let idx = Number(e.target.closest(".listbox").dataset.on) - 1;
    let arr = data.filter((_, id) => id == idx);
    let [obj] = arr;
    let ar = data1.filter((val) => val.id != obj.id);
    setData(ar);
  }
  function handlestar(e) {
    let idx = Number(e.target.closest(".listbox").dataset.on) - 1;

    if (data[idx].star === true) {
      data[idx].star = false;
    } else {
      setCOL("lightgreen");
      data[idx].star = true;
    }

    setData([...data1]);
  }
  function handlecheck(e) {
    let idx = Number(e.target.closest(".listbox").dataset.on) - 1;
    if (e.target.checked) {
      data[idx].complete = true;
      setData([...data1]);
    } else {
      data[idx].complete = false;
      setData([...data1]);
    }
  }
  return (
    <div className="todo-container">
      {data.map((val, idx) => {
        return val.complete === true ? (
          <div key={val.id} data-on={idx + 1} className="listbox">
            <div className="text">
              <input
                type="checkbox"
                defaultChecked={true}
                name="che"
                id="lo"
                onClick={handlecheck}
              />
              <span>{val.value}</span>
              <span>{val.date}</span>
            </div>
            <div className="icon">
              <i
                className="fa fa-close"
                onClick={handelete}
                style={{ fontSize: "36px", color: "red" }}
              ></i>
              {val.star !== true ? (
                <i
                  className="fa fa-star"
                  onClick={handlestar}
                  style={{ fontSize: "36px", color: "grey" }}
                ></i>
              ) : (
                <i
                  className="fa fa-star"
                  onClick={handlestar}
                  style={{ fontSize: "36px", color: `${color}` }}
                ></i>
              )}
            </div>
          </div>
        ) : (
          <div key={val.id} data-on={idx + 1} className="listbox">
            <div className="text">
              <input
                type="checkbox"
                name="che"
                defaultChecked={false}
                id="lo"
                onClick={handlecheck}
              />
              <span>{val.value}</span>
              <span>{val.date}</span>
            </div>
            <div className="icon">
              <i
                className="fa fa-close"
                onClick={handelete}
                style={{ fontSize: "36px", color: "red" }}
              ></i>
              {val.star !== true ? (
                <i
                  className="fa fa-star"
                  onClick={handlestar}
                  style={{ fontSize: "36px", color: "grey" }}
                ></i>
              ) : (
                <i
                  className="fa fa-star"
                  onClick={handlestar}
                  style={{ fontSize: "36px", color: `${color}` }}
                ></i>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
function Filter({ onchange }) {
  const [value, setvalue] = useState("all");
  let handleSelect = (e) => {
    setvalue(e.target.value);
    onchange(e.target.value);
  };
  return (
    <select id="filt" value={value} onChange={handleSelect}>
      <option value="all">ALL</option>
      <option value="star">Star</option>
      <option value="complete">complete</option>
      <option value="uncomplete">uncomplete</option>
    </select>
  );
}
export default Todoapp;
