import React from "react";
import RootRouter from "./RootRouter";
import GlobalStyles from "./GlobalStyles";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <RootRouter />
    </>
  );
};

export default App;
