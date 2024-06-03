import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (searchParam.trim() !== "") {
      navigate(`/news?q=${searchParam.trim()}`);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
