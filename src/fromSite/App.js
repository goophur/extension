import React from "react";
import { Provider } from "./context";
import GlobalApp from "./GlobalApp";



function App() {
  return (
    <Provider>
      <GlobalApp />
    </Provider>
  );
}

export default App;
