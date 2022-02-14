import { useState, createContext } from "react";

let LogContext = createContext(false);
let cartContext = createContext({});
export const Provider = ({ children }) => {
  const [issubmi, setsubmit] = useState(false);
  return (
    <LogContext.Provider value={{ issubmi, setsubmit }}>
      {children}
    </LogContext.Provider>
  );
};
export const Provider1 = ({ children }) => {
  const [cartdata, setCart] = useState([]);
  return (
    <cartContext.Provider value={{ cartdata, setCart }}>
      {children}
    </cartContext.Provider>
  );
};

export default LogContext;

export { cartContext };
